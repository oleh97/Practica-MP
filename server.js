//Import express and socket.io for the conectivity
const express = require("express");
const socket = require("socket.io");
const https = require('https');

//Start the server to listen to the port 80
const app = express();
const server = app.listen(80);

/*Store all the drawed lines in a room
*
* This should be a connection to a database
* to improve efficiency
* For now we'll keep it like this
*/
const Room = require("./room")
const clientObjects = require("./public/client");
var lines = [];
var rooms = [];
var chat = [];
var words = [];
var players = [];

function randomWord() {
    return words[Math.floor(Math.random() * (words.length - 0 + 1)) + 0];
}

https.get('https://randomwordgenerator.com/json/nouns.json', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        aux = [];
        aux = JSON.parse(data);
        for(w of aux.data) {
            if(w.noun.length >= 4)
                words.push(w.noun)
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});


https.get('https://randomwordgenerator.com/json/verbs.json', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        aux = [];
        aux = JSON.parse(data);
        for(w of aux.data) {
            if(w.verb.length >= 4)
                words.push(w.verb)
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});

https.get('https://randomwordgenerator.com/json/adjectives.json', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        aux = [];
        aux = JSON.parse(data);
        for(w of aux.data) {
            if(w.adjective.length >= 4)
                words.push(w.adjective)
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});

//This will tell the server to only show what's on the public folder
app.use(express.static('public'));

//Prints on the console a line so we know the server is up and running
console.log("Servidor online");

//In and out socket connection
var io = socket(server);

/*When the socket gets a new connection petition it will start emitting and receiving data
* and broadcasting it to all the other connected devices
*/
io.on('connection', newConnection);

/*Inside this function there will be all the functionality on the server side
* and all the methods inside will handle each client
*
* There are 2 types of
*/
function newConnection(socket) {
    //Logs the time and the IP of the new device
    var d = new Date();
    var ip = socket.request.connection.remoteAddress;
    console.log('New connection from: ' + ip + ', At: ' + d.getDate() + "/"
        + (d.getMonth()+1)  + "/"
        + d.getFullYear() + " @ "
        + d.getHours() + ":"
        + d.getMinutes() + ":"
        + d.getSeconds());

    /*Just in case someone refreshes the webpage, the server will need to send
        all the data again. It will split the lines array in chunks of 500 and
        send those, in order to not overload the sockets connections
     */
    if(lines.length != 0) {
        // set this to whatever number of items you can process at once
        var chunk = 500;
        var timeOut = 50;
        var index = 0;
        console.log("//SENDING "+lines.length+" LINES TO THE NEW DEVICE"+" (RATE: "+
            chunk+" every "+ timeOut+ " ms)");
        function doChunk() {
            var cnt = chunk;
            while (cnt-- && index < lines.length) {
                // process array[index] here
                socket.emit("refresh", lines[index]);
                ++index;
            }
            if (index < lines.length) {
                // set Timeout for async iteration
                setTimeout(doChunk, timeOut);
            }
            console.log("               //:" + (chunk - cnt - 1) + " LINES UPDATED");
        }
        doChunk();
    }
    if(chat.length != 0) {
        for(let i = 0; i<chat.length; i++) {
            socket.emit("chatClient", chat[i]);
        }
    }
    if(players.length != 0) {
        // for(let i = 0; i<players.length; i++) {
        //     socket.emit("clientName", players[i]);
        // }
        for(let player of players) {
            socket.emit('clientName', player);
        }
    }
    socket.on("newClientNick", printNicks);
    function printNicks(data){
        socket.player = data;
        if(players.length == 0){
            socket.player.isPlaying = true;
            data.isPlaying = true;
            players.push(data);
            socket.emit("isPlaying");
        }
        else {
            players.push(data);
            socket.broadcast.emit("clientName", data);
        }
    }
    
    /*
        Anytime the client drags the mouse sends data
        it emits each line to the server and then stores all the data.
        Then the server will emit the received lines to everybody else
        connected.
     */
    socket.on("mouse", emitData);
    function emitData(data) {
        let l = new clientObjects.Line(data.x,data.y, data.x1, data.y1, data.color);
        lines.push(l);
        socket.broadcast.emit("mouse", data);
    }

    socket.on("chatMessage", handleMessage);
    function handleMessage(msg) {
        chat.push(msg);
        socket.broadcast.emit("chatClient", msg);
    }

    /*
        When someone presses the Reset button, the server deletes all the stored data
        and resets the canvas in each connected client
     */
    socket.on("reset", resetLocal);
    function resetLocal() {
        lines = [];
        socket.broadcast.emit("serverReset");
    }

    socket.on("createRoom", createRoom);
    function createRoom(name, pass) {
        let r = new Room(name, pass);
        rooms.push(r);
        console.log(rooms)
    }

    //Logs in the console each time any client disconnects
    socket.on('disconnect', disconected);
    function disconected() {
        var d = new Date();
        var ip = socket.request.connection.remoteAddress;
        console.log('Disconnected: ' + ip + ', At: ' + d.getDate() + "/"
            + (d.getMonth()+1)  + "/"
            + d.getFullYear() + " @ "
            + d.getHours() + ":"
            + d.getMinutes() + ":"
            + d.getSeconds());

        let index = players.indexOf(socket.player);
        if (index > -1) {
            players.splice(index, 1);
            console.log('Disconnecting player '+ socket.player.name);
            socket.broadcast.emit("playerDisconnected", socket.player);
        }

    }
}

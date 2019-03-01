//Import express and socket.io for the conectivity
const express = require("express");
const socket = require("socket.io");

//Start the server to listen to the port 80
var app = express();
var server = app.listen(80);

/*Store all the drawed lines in a room
*
* This should be a connection to a database
* to improve efficiency
* For now we'll keep it like this
*/
var lines = [];

//This will tell the server to only show what's on the public folder
app.use(express.static('public'));

//Prints on the console a line so we know the server is up and running
console.log("Servidor online");

//In and out socket connection
var io = socket(server);

/*When the socket gets a new connection petition it will start emitting and receiving data
* and broadcasting it to all the other connected devices
*/
io.sockets.on('connection', newConnection);

//This is the function that is going to handle each connection
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


    //for(var i in lines) {
        socket.emit('mouse', lines);
    //}
    socket.on("mouse", sendData);
    function sendData(data) {
        lines.push(data);
        socket.broadcast.emit('mouse', data);
    }
    socket.on("delete", deleteLines);
    function deleteLines() {
        lines = [];
        socket.broadcast.emit("delete");
    }
}

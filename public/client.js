var socket;

//Class line to create the objects we will store
class Line {
    constructor(x, y, x1, y1, color) {
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
        this.color = color;
    }

    //Function that draws a line given its coords
    drawLine() {
        stroke(this.color);
        line(this.x, this.y, this.x1, this.y1);
    }
}

class Player {
    constructor(name, score, isPlaying) {
        this.name = name;
        this.score = score;
        this.isPlaying = isPlaying;
        this.socket;
    }

    updateScore(score) {
        this.score += score;
    }
}

var myPlayer = new Player();

//Gets the color that the client has selected
function getCurrentColor() {
    return document.getElementById("html5colorpicker").value;
}

//So we can use the lines objects in the server side
module.exports = {
    Line:Line,
    Player:Player
}

//Creates the canvas and sets the functions that will receive data from the server
function setup() {
    let canvas = createCanvas(760, 550);
    canvas.parent("canvas");
    background(240);
    //socket = io();
    socket = io.connect();
    socket.on("mouse", updateCanvas);
    socket.on("serverReset", whiteCanvas);
    socket.on("refresh", refreshData);
    socket.on("chatClient", addMessage);
    socket.on("clientName", addClient);
    socket.on("playerDisconnected", removePlayer);
    socket.on("isPlaying", setPlayerPlaying);
    socket.on("getGuessingWord", setGuessingWord);
}

function setGuessingWord(guessWord) {
    let string = new Array(guessWord + 1).join( '-' );
    console.log(string);
    var node = document.createElement("P");
    var textnode = document.createTextNode(string);
    node.appendChild(textnode);
    document.getElementById('main').appendChild(node);
}

function setPlayerPlaying(word) {
    var node = document.createElement("P");
    var textnode = document.createTextNode(word);
    node.appendChild(textnode);
    document.getElementById('main').appendChild(node);
    myPlayer.isPlaying = true;
    let button = document.getElementById('send');
    button.disabled = true;
    let colorButton = document.getElementById('html5colorpicker');
    colorButton.disabled = false;
    let resetButton = document.getElementById('reset');
    resetButton.disabled = false;
}

function removePlayer(player) {
    var removedPlayer = document.getElementById('player'+player.name);
    removedPlayer.remove();
}

function askNick() {
    var name = window.prompt("Escribe tu nick: ");
    var node = document.createElement("P");
    node.className = "myPlayer";
    node.id = 'player'+name;
    myPlayer.name = name;
    myPlayer.score = 0;
    myPlayer.isPlaying = false;
    var textnode = document.createTextNode(myPlayer.name + ' ----- Puntos: '+ myPlayer.score);
    let button = document.getElementById('html5colorpicker');
    let resetButton = document.getElementById('reset');
    button.disabled = true;
    resetButton.disabled = true;
    node.appendChild(textnode);
    document.getElementById("points").appendChild(node);
    socket.emit("newClientNick", myPlayer);
}

//Every time any client connects, the server will push all the data to him
function refreshData(data) {
    strokeWeight(20);
    let l = new Line(data.x, data.y, data.x1, data.y1, data.color);
    l.drawLine();
}

//Emits a reset method to all the clients
function reset() {
    background(240);
    socket.emit("reset");
}


function addMessage(msg) {
    if (!msg.length <= 0) {
        var node = document.createElement("P");                 // Create a <li> node
        var textnode = document.createTextNode(msg);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("mensajes").appendChild(node);
    }
}
function addClient(p) {
    var node = document.createElement("P");
    node.className = "otherPlayer";
    node.id = 'player'+p.name;
    var textnode = document.createTextNode(p.name + ' ----- Puntos: '+ p.score);
    node.appendChild(textnode);
    document.getElementById("points").appendChild(node);
}

function sendMessage() {
    let msg = document.getElementById("message").value;
    if (!msg.length <= 0) {
        var node = document.createElement("P");                 // Create a <li> node
        var textnode = document.createTextNode(msg);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("mensajes").appendChild(node);
        document.getElementById("message").value = '';
        socket.emit("chatMessage", myPlayer.name+': '+msg);
    }
}

function whiteCanvas() {
    background(240);
}

/*
    Everytime the server pushes new data to the client, it will draw
    all the new lines that other users have painted
 */

function updateCanvas(data) {
    strokeWeight(20);
    let l = new Line(data.x, data.y, data.x1, data.y1, data.color);
    l.drawLine();
}

//Anytime the client drags the mouse, it will create new lines and emit them to the server
function mouseDragged() {
    if(myPlayer.isPlaying) {
        let l = new Line(mouseX, mouseY, pmouseX, pmouseY, getCurrentColor());
        strokeWeight(20);
        l.drawLine();
        socket.emit("mouse", l);
    }
}

function createRoom() {
    let nameRoom = document.getElementsByName("roomName");
    let namePass = document.getElementsByName("roomPassword")
    socket.emit("createRoom", nameRoom, namePass);
}

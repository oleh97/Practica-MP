var socket;
var word = [];

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
        this.hasWon = false;
        this.socket;
    }

    updateScore(score) {
        this.score += score;
    }
}

var myPlayer = new Player();
var sec = 0;
var hasWon = false;

//Gets the color that the client has selected
function getCurrentColor() {
    return document.getElementById("html5colorpicker").value;
}

//So we can use the lines objects in the server side
module.exports = {
    Line: Line,
    Player: Player
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
    socket.on("currentTime", setCurrentTime);
    socket.on("correctWord", finishGame);
    socket.on("updatePoints", updatePoints);
    socket.on("updatePlayer", updatePlayer);
    socket.on("hint", updateHiddenWord);

    document.getElementById("message")
        .addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("send").click();
            }
        });

}


function updateHiddenWord(guessWord) {
    if (!myPlayer.isPlaying)
        document.getElementById('wordToGuess').innerText = guessWord;
}

function setCurrentTime(seconds) {
    sec = seconds;
    document.getElementById("reloj").innerHTML = sec;
}


function setGuessingWord(guessWord) {
    let string = new Array(guessWord + 1).join('-');
    var node = document.createElement("P");
    var textnode = document.createTextNode(string);
    node.appendChild(textnode);
    document.getElementById('wordToGuess').appendChild(node);
}

function setPlayerPlaying(word) {
    var node = document.createElement("P");
    var textnode = document.createTextNode("Te toca dibujar : " + word);
    node.appendChild(textnode);
    document.getElementById('wordToGuess').appendChild(node);
    myPlayer.isPlaying = true;
    let button = document.getElementById('send');
    button.disabled = true;
    let colorButton = document.getElementById('html5colorpicker');
    colorButton.disabled = false;
    let resetButton = document.getElementById('reset');
    resetButton.disabled = false;
}

function removePlayer(player) {
    var removedPlayer = document.getElementById('player' + player.name);
    removedPlayer.remove();
}

function askNick() {
    var name = window.prompt("Escribe tu nick: ");
    var node = document.createElement("P");
    node.className = "myPlayer";
    node.id = 'player' + name;
    myPlayer.name = name;
    myPlayer.score = 0;
    myPlayer.isPlaying = false;
    var textnode = document.createTextNode(myPlayer.name + ' ----- Puntos: ' + myPlayer.score);
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
    strokeWeight(10);
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
    node.id = 'player' + p.name;
    var textnode = document.createTextNode(p.name + ' ----- Puntos: ' + p.score);
    node.appendChild(textnode);
    document.getElementById("points").appendChild(node);
}

function finishGame(data) {
    if (!data.correct) {
        var node = document.createElement("P");                 // Create a <li> node
        var textnode = document.createTextNode(data.msg);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("mensajes").appendChild(node);
        document.getElementById("message").value = '';
        socket.emit("chatMessage", myPlayer.name + ': ' + data.msg);
    } else {
        var node = document.createElement("P");                 // Create a <li> node
        msg = 'Player: ' + myPlayer.name + ' has guessed the word!'
        var textnode = document.createTextNode(msg);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("mensajes").appendChild(node);
        document.getElementById("message").value = '';
        socket.emit("chatMessage", msg);
        let button = document.getElementById('send');
        button.disabled = true;
        socket.emit('endGame', myPlayer);
    }
}

function updatePoints(data) {
    console.log(data);
    let node = document.getElementById('player' + data.winner.name);
    let name = node.innerText.substring(0, node.innerText.lastIndexOf(':'));
    name += ': ' + data.winner.score;
    node.innerText = name;

    node = document.getElementById('player' + data.player.name);
    name = node.innerText.substring(0, node.innerText.lastIndexOf(':'));
    name += ': ' + data.player.score;
    node.innerText = name;
}

function sendMessage() {
    let msg = document.getElementById("message").value;
    if (!msg.length <= 0) {
        socket.emit("checkCorrectWord", msg);
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
    strokeWeight(10);
    let l = new Line(data.x, data.y, data.x1, data.y1, data.color);
    l.drawLine();
}

//Anytime the client drags the mouse, it will create new lines and emit them to the server
function mouseDragged() {
    if (myPlayer.isPlaying) {
        let l = new Line(mouseX, mouseY, pmouseX, pmouseY, getCurrentColor());
        strokeWeight(10);
        l.drawLine();
        socket.emit("mouse", l);
    }
}

function updatePlayer(data) {
    myPlayer = data.player;
    console.log(data);
    if (data.correct) {
        var node = document.getElementById("wordToGuess");
        node.innerText = "";
        myPlayer.hasWon = false;
        let button = document.getElementById('send');
        button.disabled = true;
        let colorButton = document.getElementById('html5colorpicker');
        colorButton.disabled = false;
        let resetButton = document.getElementById('reset');
        resetButton.disabled = false;
        reset();

    } else {
        var node = document.getElementById("wordToGuess");
        node.innerText = ""
        myPlayer.isPlaying = false;
        myPlayer.hasWon = false;
        let button = document.getElementById('send');
        button.disabled = false;
        let colorButton = document.getElementById('html5colorpicker');
        colorButton.disabled = true;
        let resetButton = document.getElementById('reset');
        resetButton.disabled = true;
    }
}

function createRoom() {
    let nameRoom = document.getElementsByName("roomName");
    let namePass = document.getElementsByName("roomPassword")
    socket.emit("createRoom", nameRoom, namePass);
}

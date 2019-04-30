var socket;

//Class line to create the objects we will store
 class Line {
    constructor(x,y,x1,y1,color) {
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

//Gets the color that the client has selected
function getCurrentColor() {
     return document.getElementById("html5colorpicker").value;
}

//So we can use the lines objects in the server side
module.exports = Line;

 //Creates the canvas and sets the functions that will receive data from the server
function setup() {
    let canvas = createCanvas(760,550);
    canvas.parent("canvas");

    background(240);
    //socket = io();
    socket = io.connect();
    socket.on("mouse", updateCanvas);
    socket.on("serverReset", whiteCanvas);
    socket.on("refresh", refreshData);
    socket.on("chatClient", addMessage);
}

//Every time any client connects, the server will push all the data to him
function refreshData(data) {
    strokeWeight(20);
    let l = new Line(data.x,data.y, data.x1, data.y1, data.color);
    l.drawLine();
}

//Emits a reset method to all the clients
function reset() {
    background(250);
    socket.emit("reset");
}


function addMessage(msg) {

    if(!msg.length <= 0) {
        var node = document.createElement("P");                 // Create a <li> node
        var textnode = document.createTextNode(msg);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("mensajes").appendChild(node);
    }
}

//NOT WORKING YET
function sendMessage() {
    //console.log(document.getElementById("message").value)
    let msg = document.getElementById("message").value;

    if(!msg.length <= 0) {
        var node = document.createElement("P");                 // Create a <li> node
        var textnode = document.createTextNode(msg);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("mensajes").appendChild(node);
        document.getElementById("message").value = '';
        socket.emit("chatMessage", msg);
    }
}

function whiteCanvas() {
    background(150);
}

/*
    Everytime the server pushes new data to the client, it will draw
    all the new lines that other users have painted
 */

function updateCanvas(data) {
    strokeWeight(20);
    let l = new Line(data.x,data.y, data.x1, data.y1, data.color);
    l.drawLine();
}

//Anytime the client drags the mouse, it will create new lines and emit them to the server
function mouseDragged() {
    let l = new Line(mouseX, mouseY, pmouseX, pmouseY, getCurrentColor());
    strokeWeight(20);
    l.drawLine();
    socket.emit("mouse", l);
}

function createRoom() {
    let nameRoom = document.getElementsByName("roomName");
    let namePass = document.getElementsByName("roomPassword")
    socket.emit("createRoom", nameRoom, namePass);
}


var socket;
var lines = [];
var linesErased = [];
var isErasing;

function setup() {
    createCanvas(800,600);
    isErasing = false;
    socket = io();
    socket.on("mouse", updateCanvas);
    socket.on("delete", deleteLocal);
}

function updateCanvas(data) {
    //strokeWeight(20);
    //stroke(80,15,200);
    lines.push(data);
}

function mouseDragged() {
    //stroke(80,15,200);
    //line(mouseX, mouseY, pmouseX, pmouseY);
    var data = {
        x: mouseX,
        y: mouseY,
        x1: pmouseX,
        y1: pmouseY
    };
    if(!isErasing) {
        lines.push(data);
        socket.emit("mouse", data);
    }
    else {
        linesErased.push(data);
    }
}

function borrar() {
    lines = [];
    socket.emit("delete");
}

function rubber() {
    isErasing = !isErasing;
}

function deleteLocal() {
    lines = [];
    linesErased = [];
}

function draw() {
    background(150);
    strokeWeight(20);
    stroke(150);
    for(var i in linesErased) {
        line(linesErased[i].x, linesErased[i].y, linesErased[i].x1, linesErased[i].y1);
    }
    stroke(80,15,200);
    for(var i in lines) {
        line(lines[i].x, lines[i].y, lines[i].x1, lines[i].y1);
    }

}
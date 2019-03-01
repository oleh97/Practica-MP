var socket;

function setup() {
    createCanvas(800,600);
    background(150);
    socket = io();
    socket.on("mouse", updateCanvas);
    socket.on("serverReset", whiteCanvas);
    socket.on("refresh", refreshData);
}

function refreshData(data) {
    strokeWeight(20);
    stroke(80,15,200);
    console.log(data.length)
    for(let i in data){
        line(data[i].x, data[i].y, data[i].x1, data[i].y1);
    }
}

function reset() {
    background(150);
    socket.emit("reset");
}

function whiteCanvas() {
    background(150);
}

function updateCanvas(data) {
    strokeWeight(20);
    stroke(80,15,200);
    line(data.x, data.y, data.x1, data.y1);
}

function mouseDragged() {
    let data = {
        x: mouseX,
        y: mouseY,
        x1: pmouseX,
        y1: pmouseY
    };
    strokeWeight(20);
    stroke(80,15,200);
    line(data.x, data.y, data.x1, data.y1);
    socket.emit("mouse", data);
}


var socket;

 class Line {
    constructor(x,y,x1,y1,color) {
        this.x = x;
        this.y = y;
        this.x1 = x1;
        this.y1 = y1;
        this.color = color;
    }

    drawLine() {
        stroke(this.color);
        line(this.x, this.y, this.x1, this.y1);
    }
}

function getCurrentColor() {
     return document.getElementById("html5colorpicker").value;
}

module.exports = Line;

function setup() {
    createCanvas(800,600);
    background(150);
    //socket = io();
    socket = io.connect("http://pinturillo.ddns.net", { secure: true });
    socket.on("mouse", updateCanvas);
    socket.on("serverReset", whiteCanvas);
    socket.on("refresh", refreshData);
}

function refreshData(data) {
    strokeWeight(20);
    let l = new Line(data.x,data.y, data.x1, data.y1, data.color);
    l.drawLine();
    socket.emit("received");
}

function reset() {
    background(150);
    socket.emit("reset");
}

function sendMessage() {
    socket.emit("chatMessage", $("#message").val());
    $("#message").val('');
}

function whiteCanvas() {
    background(150);
}

function updateCanvas(data) {
    strokeWeight(20);
    let l = new Line(data.x,data.y, data.x1, data.y1, data.color);
    l.drawLine();
}

function mouseDragged() {
    let l = new Line(mouseX, mouseY, pmouseX, pmouseY, getCurrentColor());
    strokeWeight(20);
    l.drawLine();
    socket.emit("mouse", l);
}


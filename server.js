var express = require ('express');
var app = express();
var server = app.listen(3000);
var lines = [];


app.use(express.static('public'));

console.log("Servidor online");

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    var d = new Date();
    var ip = socket.request.connection.remoteAddress;
    console.log('New connection from: ' + ip + ', At: ' + d.getDate() + "/"
        + (d.getMonth()+1)  + "/"
        + d.getFullYear() + " @ "
        + d.getHours() + ":"
        + d.getMinutes() + ":"
        + d.getSeconds());

    for(var i in lines) {
        socket.emit('mouse', lines[i]);
    }
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

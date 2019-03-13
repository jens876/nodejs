var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(name, msg){
    io.emit('chat message', name + ": " + msg);
    console.log(name + ": " + msg);
  });
  socket.on('disconnect', function(){
    io.emit('chat massage', "someone Disconnected...");
    console.log("disconnect");
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var chache = [];

function addMsg(msg) {
  if (chache.length > 10) {
    chache.shift();
  }
  chache.push(msg);
}

io.on('connection', function(socket){
  socket.on('getHistory', function() {
    chache.forEach(function(element) {
      socket.emit('chat message', element); 
    });
  });
  socket.on('chat message', function(name, msg){
    if (name != "" && msg != "") {
      io.emit('chat message', name + ": " + msg);
      addMsg(name + ": " + msg);
      console.log(name + ": " + msg);
      console.log(chache);
    }
  });
  socket.on('disconnect', function(){
    io.emit('chat message', "someone Disconnected...");
    console.log("disconnect");
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

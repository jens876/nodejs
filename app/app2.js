const http = require("http");
const express = require("express");
const fs = require("fs");

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/suite.keepout.de/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/suite.keepout.de/chain.pem")
};
      
const app = express();
      
app.use((req, res) => {
  res.writeHead(200);
  res.end("hello world\n");
});

http.createServer(options, app).listen(80);
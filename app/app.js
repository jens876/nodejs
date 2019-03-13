const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/suite.keepout.de/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/suite.keepout.de/fullchain.pem")
};
      
https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(443);
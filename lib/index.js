import http from 'http';

var fs = require('fs')

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1', function(){
  fs.writeFile(__dirname + '/../start.log', 'started');
  console.log('Server running at http://127.0.0.1:1337/');
});



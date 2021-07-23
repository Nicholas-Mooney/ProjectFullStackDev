

const port = process.env.PORT || 8000;

let http = require('http');
let router = require('./route');


let handleRequest = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });

};

http.createServer(router.handleRequest).listen(port);


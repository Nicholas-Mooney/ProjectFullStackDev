const express = require("express");
const app = express();
let fs = require('fs');
const port = process.env.PORT || 8000;

app.get(["/index.html", "/:name"], (request, response) => {

  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  fs.readFile('./index.html', null, function (error, data) {
    if (error) {
      response.writeHead(404);
      response.write('Whoops! File not found!');
    } else {
      response.write(data);
    }
    response.end();
  });
});
app.get(["/signUp.html"], (request, response) => {

  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  fs.readFile('./signUp.html', null, function (error, data) {
    if (error) {
      response.writeHead(404);
      response.write('Whoops! File not found!');
    } else {
      response.write(data);
    }
    response.end();
  });
});
app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`))


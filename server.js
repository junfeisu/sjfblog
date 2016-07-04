var http = require('http'),
  url = require('url'),
  port = "8888";

function start(route) {
  http.createServer(function(request, response) {
    var pathName = url.parse(request.url).pathname;
    route(pathname, request, response);
  }).listen(port);
  console.log("Server has started at http:127.0.0.1:8888")
}

exports.start = start;

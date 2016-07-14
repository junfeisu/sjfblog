var http = require('http'),
  url = require('url'),
  proxy = require('http-proxy-middleware'),
  port = "9999";

function start(route) {
  http.createServer(function(request, response) {
    console.log('the request url is ' + request.url);
    var pathName = url.parse(request.url).pathname;
    route(pathName, request, response);
  }).listen(port);
  console.log("Server has started at http:127.0.0.1:9999")
}

exports.start = start;

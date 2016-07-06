var server = require('./server'),
  route = require('./route/route');
global.Controller = require('./controller');

server.start(route);

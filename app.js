var server = require('./server'),
  route = require('./route/route'),
  init = (function() {
    return function() {
      var data = {
        data: null,
        err: ''
      }
      return data
    }
  })
global.Controller = require('./controller');
global.initData = init();
server.start(route);

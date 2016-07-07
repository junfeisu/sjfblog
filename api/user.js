var util = require("util"),
  operate = require('../static/operate').Operation,
  initConf = function() {
    return function() {
      var config = {
        findMes: '',
        updateMes: '',
        type: 'User',
      }
      return config;
    }
  }(),

  initConfig = initConf();

exports.User = {
  getuserinfo: function(req, res, formaturl) {
    initConfig.findMes = JSON.parse(formaturl).query;
    var result = operate.search(initConfig);
    if (result === 'ERROR') {
      res.writeHead(500, {
        'Content-type': 'text/plain'
      });
      res.write('There is some wrong with mongodb error');
    } else {
      res.writeHead(200, {
        'Content-type': 'application/json'
      })
      res.write(JSON.stringify(result));
    }
    res.end();
  },
  login: function(req, res, formaturl) {
    var data = JSON.parse(formaturl._postData);
    if (data.username === '' || data.password === '') {
      res.writeHead(403, {
        'Content-type': 'text/plain'
      });
      res.write("the password or username can't be null");
    } else {
      initConfig.findMes = data;
      var result = operate.search(initConfig);
      if (result === 0) {
        res.writeHead(500, {
          'Content-type': 'text/plain'
        });
        res.write('There is some wrong with mongodb error');
      }
      res.writeHead(200, {
        'Content-type': 'text/plain'
      });
      res.write('login success')
    }
    res.end();
  },
  signup: function(req, res, formaturl) {
    var data = JSON.parse(formaturl._postData);
    if (data.username === '' || data.password === '') {
      res.writeHead(403, {
        'Content-type': 'text/plain'
      });
      res.write("the password or username can't be null");
    } else {
      initConfig.findMes = data;
      var result = operate.add(initConfig);
      if (result === 0) {
        res.writeHead(500, {
          'Content-type': 'text/plain'
        });
        res.write('There is some wrong with mongodb error');
      } {
        res.writeHead(200, {
          'Content-type': 'text/plain'
        });
        res.write('register succeed');
      }
      res.end();
    }
  }
}

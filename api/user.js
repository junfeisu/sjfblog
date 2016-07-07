var util = require("util"),
  schema = require('../static/schema'),
  operate = require('../static/mongo').mongoUse,
  User = schema.models['User'],
  deal = function() {
    if (arguments[1] === 'ERROR') {
      arguments[0].writeHead(500, {
        'Content-type': 'text/plain'
      });
      arguments[0].write("There is some wrong with mongodb error");
    } else {
      arguments[0].writeHead(200, {
        'Content-type': 'application/json'
      });
      arguments[0].write(JSON.stringify(arguments[1]), 'utf8')
    }
    arguments[0].end();
  };
exports.User = {
  getuserinfo: function(req, res, formaturl) {
    var findMes = JSON.parse(formaturl).query;
    operate.search(User, findMes, function(err, result) {
      // var newResult={
      //   status: 
      // }
      err ? deal(res, 'ERROR') : deal(res, result);
    });
  },
  login: function(req, res, formaturl) {
    var data = JSON.parse(formaturl._postData);
    if (data.username === '' || data.password === '') {
      res.writeHead(403, {
        'Content-type': 'text/plain'
      });
      res.write("the password or username can't be null");
    } else {
      operate.find(User, data, fucntion(err, result) {
        if (err)
          deal(res, 'ERROR')
      })
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

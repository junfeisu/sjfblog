var schema = require('../model/schema'),
  operate = require('../model/mongo').mongoUse,
  deal = function() {
    var newResult = {};
    if (arguments[1] === 'ERROR') {
      newResult = {
          msg: 'fail',
          data: 'There is some wrong with mongodb operate'
        },
        arguments[0].writeHead(500, {
          'Content-type': 'text/plain'
        });
    } else {
      console.log(arguments[1])
      newResult = {
        msg: 'success',
        data: arguments[1]
      };
      arguments[0].writeHead(200, {
        'Content-type': 'application/json'
      });
    }
    console.log(newResult);
    arguments[0].write(JSON.stringify(newResult), 'utf8');
    arguments[0].end();
  },
  User = schema.models['User'],
  person = new User(),
  error;

exports.User = {
  getuserinfo: function(req, res, formaturl) {
    var findMes = JSON.parse(formaturl).query;
    operate.search(User, findMes, function(err, result) {
      err ? deal(res, 'ERROR') : deal(res, result);
    });
  },
  login: function(req, res, formaturl) {
    var data = JSON.parse(JSON.parse(formaturl)._postData);
    if (data.username === '' || data.password === '') {
      res.writeHead(403, {
        'Content-type': 'text/plain'
      });
      res.write("the password or username can't be null");
      res.end();
    } else {
      operate.search(User, data, function(err, result) {
        err ? deal(res, 'ERROR') : deal(res, result);
      })
    }
  },
  signup: function(req, res, formaturl) {
    var data = JSON.parse(JSON.parse(formaturl)._postData);
    if (data.username === '' || data.password === '') {
      res.writeHead(403, {
        'Content-type': 'text/plain'
      });
      res.write("the password or username can't be null");
      re.end();
    } else {
      var person = new User(data);
      operate.add(person, function(err) {
        err ? deal(res, 'ERROR') : operate.search(User, data, function(err, result) {
          err ? deal(res, 'ERROR') : deal(res, result)
        })
      });
    }
  }
}

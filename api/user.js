var schema = require('../model/schema'),
  operate = require('../model/mongo').mongoUse,
  deal = function() {
    var newResult = {};
    if (arguments[1] === 'ERROR') {
      newResult = {
          msg: 'fail',
          data: arguments[2]
        },
        arguments[0].writeHead(500, {
          'Content-type': 'text/plain'
        });
    } else {
      newResult = {
        msg: 'success',
        data: arguments[1]
      };
      arguments[0].writeHead(200, {
        'Content-type': 'application/json'
      });
    }
    arguments[0].write(JSON.stringify(newResult), 'utf8');
    arguments[0].end();
  };

exports.User = {
  getuserinfo: function(req, res, formaturl) {
    var findMes = JSON.parse(formaturl).query;
    operate.search(schema.models['User'], findMes, function(err, result) {
      err ? deal(res, 'ERROR', err) : deal(res, result);
    });
  },
  login: function(req, res, formaturl) {
    var data = JSON.parse(JSON.parse(formaturl)._postData);
    operate.search(schema.models['User'], data, function(err, result) {
      err ? deal(res, 'ERROR', err) : deal(res, result);
    })
  },
  signup: function(req, res, formaturl) {
    var data = JSON.parse(JSON.parse(formaturl)._postData),
      person = new schema.models['User'](data);
    operate.add(person, function(err) {
      err ? deal(res, 'ERROR', err) : operate.search(schema.models['User'], data, function(err, result) {
        err ? deal(res, 'ERROR', err) : deal(res, result)
      })
    });
  }
}

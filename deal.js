var operate = require('./model/mongo').mongoUse,
  schema = require('./model/schema'),
  dealCall = function(res, check, errMsg) {
    var newResult = {};
    if (check === 'ERROR') {
      newResult = {
        flag: false,
        err: errMsg
      }
      res.writeHead(500, {
        'Content-type': 'application/json'
      })
    } else {
      newResult = {
        flag: true,
        data: check
      };
      if (newResult.data.length === 0) {
        newResult.data = errMsg
      }
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
    };
    res.write(JSON.stringify(newResult));
    res.end()
  };
exports.deal = {
  dealAdd: function(res, url, msg) {
    var type = msg.toLowerCase(),
      addBefore = function() {
        var data = JSON.parse(JSON.parse(url)._postData),
          entity = new schema.models[msg](data);
        operate.add(entity, function(err, result) {
          err ? addAfter('ERROR', err) : operate.search(schema.models[msg], { '_id': result._id },
            function(err, result) {
              addAfter(result, '')
            })
        })
      },
      addAfter = function(check, msg) {
        if (check === 'ERROR') {
          res.writeHead(500, {
            'Content-type': 'application'
          });
          res.write(JSON.stringify(msg));
        } else {
          res.writeHead(200, {
            'Content-type': 'application/json'
          });
          res.write(JSON.stringify({
            flag: true,
            data: msg
          }))
        }
        res.end()
      };
    addBefore();
  },
  dealDel: function(res, url, msg) {
    var type = msg.toLowerCase(),
      delBefore = function() {
        var data = JSON.parse(JSON.parse(url)._postData);
        operate.remove(schema.models[msg], data, function(err, result) {
          err ? delAfter('ERROR', err) : operate.search(schema.models[msg], data, function(err, result) {
            err ? delAfter('ERROR', err) : delAfter(result, '')
          })
        });
      },
      delAfter = function(check, result) {
        dealCall(res, check, result);
      };
    delBefore()
  },
  dealSearch: function(res, url, msg) {
    var type = msg.toLowerCase(),
      searchBefore = function() {
        var data = JSON.parse(JSON.parse(url)._postData);
        //deal the login
        if (data.hasOwnProperty('password')) {
          operate.search(schema.models[msg], data, function(err, result) {
            err ? searchAfter('ERROR', '') : searchAfter(result, 'The user is not our member!')
          })
        } else {
          operate.search(schema.models[msg], data, function(err, result) {
            err ? searchAfter('ERROR', err) : searchAfter(result, type + '_id is not exist');
          });
        }
      },
      searchAfter = function(check, errMsg) {
        dealCall(res, check, errMsg);
      };
    searchBefore()
  },
  dealUpdate: function(res, url, msg) {
    var type = msg.toLowerCase(),
      updateBefore = function() {
        var data = JSON.parse(JSON.parse(url)._postData);
        operate.update(schema.models[msg], data, function(err, result) {
          err ? updateAfter('ERROR', err) : updateAfter(result, 'There is no match message')
        })
      },
      updateAfter = function(check, msg) {
        if (check === 'ERROR') {
          res.writeHead(500, {
            'Content-type': 'application/json'
          });
          res.write(JSON.stringify(msg));
        } else {
          res.writeHead(200, {
            'Content-type': 'application/json'
          });
          result.n > 0 ? res.write(JSON.stringify(result)) : res.write(msg);
        }
        res.end();
      };
    updateBefore()
  }
}

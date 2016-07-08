var operate = require('./model/mongo').mongoUse,
  schema = require('./model/schema'),
  dealNull = function(check, res, errMsg) {
    console.log('check is '+ check)
    for (var i = 0, len = check.length; i < len; i++) {
      if (check[i] === '') {
        res.writeHead(403, {
          'Content-type': 'text/plain'
        });
        res.write(errMsg);
        res.end();
        break;
      }
    }
  },
  dealCall = function(res, check, errMsg) {
    var newResult = {};
    if (check === 'ERROR') {
      newResult = {
        flag: false,
        err: 'There is some wrong with mongodb operate'
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
  },
  getProperty = function(obj) {
  	var property = [],
    	pro = Object.keys(obj);
    property.push(obj[pro]);
    return property;
  };
exports.deal = {
  dealAdd: function(res, url, msg) {
    console.log('add');
    var type = msg.toLowerCase(),
      addBefore = function() {
        var data = JSON.parse(JSON.parse(url)._postData),
          entity = new schema.models[msg](data);
        dealNull(getProperty(data), res, 'The ' + getProperty(data).slice(',').join(' ') + ' is necessary');
        operate.add(entity, function(err, result) {
          err ? addAfter('ERROR', err) : operate.search(schema.models[msg], { '_id': result._id },
            function(err, result) {
              addAfter(result, '')
            })
        })
      },
      addAfter = function(check, msg) {
        console.log('after')
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
        dealNull([type + '_id'], res, 'The ' + type + '_id is necessary');
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
          dealNull([data.username, data.password, data.email], res, 'The username and pasword and email is necessary')
          operate.search(schema.models[msg], data, function(err, result) {
            err ? searchAfter('ERROR', '') : searchAfter(result, 'The user is not our member!')
          })
        } else {
          dealNull([type + '_id'], res, 'The ' + type + '_id is necessary');
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
        dealNull(getProperty(data), res, getProperty(data).slice(',').join(' ')+'is necessary');
        operate.update(schema.models[msg], data ,function(err,result){
        	err ? updateAfter('ERROR', err) : updateAfter(result, 'There is no match message')
        })
      },
      updateAfter = function(check, msg) {
      	if(check==='ERROR'){
      		res.writeHead(500,{
      			'Content-type' : 'application/json'
      		});
      		res.write(JSON.stringify(msg));
      	}else{
      		res.writeHead(200, {
      			'Content-type' : 'application/json'
      		});
      		result.n>0? res.write(JSON.stringify(result)) : res.write(msg);
      	}
      	res.end();
      };
      updateBefore()
  }
}

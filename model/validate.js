var route = {
    '/blog/getblogbyid': { blog_id: 'number' },
    '/blog/getblogbytag': { tag: 'string' }
  },
  getPropertyName = function(obj) {
    var property = [],
      pro = Object.keys(obj);
    property.push(pro);
    return property;
  },
  getPropertyVal = function(obj) {
    var val = [],
      pro = Object.keys(obj);
    val.push(obj[pro]);
    return val
  },
  check = function(check) {
    var pathname = check.pathname,
      data = check.data,
      checkName = getPropertyName(route[pathname]),
      checkVal = getPropertyVal(check.data);
    var checkDeal = {
      Lack: {
        run: function() {
          for (var i = 0, len = checkName.length; i < len; i++) {
            if (data[checkName[i]] === '' || data[checkName][i] === null) {
              return { status: true, msg: 'The val of ' + checkName[i] + ' can not be null' }
              break;
            }
          }
          checkDeal['Null'].run.call(checkDeal);
        }
      },
      Null: {
        run: function() {
          for (var i = 0, len = checkName.length; i < len; i++) {
            if (data[checkName[i]] === '' || data[checkName][i] === null) {
              return { status: true, msg: 'The val of ' + checkName[i] + ' can not be null' }
              break;
            }
          }
          checkDeal['Type'].run.call(checkDeal);
        }
      },
      Type: {
        run: function() {
          for (var i = 0, len = checkName.length; i < len; i++) {
            if (typeof(data[checkName[i]]) !== checkVal[i]) {
              return { status: true, msg: 'The ' + checkName[i] + ' val should be ' + checkVal[i] };
              break;
            }
          }
          return { status: false, msg: '' }
        }
      }
    }
  };

exports.checkResult = function(req) {
  var result=check({ pathname: req.url, data: req.body, type: 1 });
  return result;
}

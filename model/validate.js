var route = {
  '/getblogbyid': { _id: 'string' },
  '/getblogbytag': { tags: 'string' }
}
var getPropertyName = function(obj) {
  return Object.keys(obj)
}
var getPropertyVal = function(obj) {
  var val = [],
    pro = Object.keys(obj);
  pro.forEach(function(value) {
    val.push(obj[value])
  })
  return val
}
var checkMes = function(check) {
  console.log('check')
  var checkName = getPropertyName(route[check.pathname])
  var checkVal = getPropertyVal(route[check.pathname])
  var result = ''
  var checkDeal = {
    Lack: function() {
      console.log('lack is run')
      for (var i = 0, len = checkName.length; i < len; i++) {
        if (!check.data.hasOwnProperty(checkName[i])) {
          result = { status: true, msg: 'The property of ' + checkName[i] + ' can not be lack' }
          break;
        }
      }
      checkDeal['Null']();
    },
    Null: function() {
      console.log('null is run')
      for (var i = 0, len = checkName.length; i < len; i++) {
        if (check.data[checkName[i]] === '' || check.data[checkName][i] === null) {
          result = { status: true, msg: 'The val of ' + checkName[i] + ' can not be null' }
          break;
        }
      }
      checkDeal['Type']();
    },
    Type: function() {
      console.log('type is run')
      for (var i = 0, len = checkName.length; i < len; i++) {
        if (typeof(check.data[checkName[i]]) !== checkVal[i]) {
          result = { status: true, msg: 'The ' + checkName[i] + ' val should be ' + checkVal[i] };
          break;
        }
      }
      result = { status: false, msg: '' }
    }
  }
  checkDeal['Lack']()
  return result
};

exports.checkResult = function(req) {
  console.log('checkResult')
  var result = checkMes({ pathname: req.url, data: req.body });
  console.log(result)
  return result;
}

const route = {
  '/blogbyid': { _id: 'string' },
  '/bloglist': { cursor: 'string'}
}

const propertyUtils = {
  getName (obj) {
    return Object.keys(obj)
  },
  getValue (obj) {
    var val: any [] = []
    var pro = Object.keys(obj)
    pro.forEach(function(value: string): void {
      val.push(obj[value])
    })
    return val
  }
}

var checkMes = function(check) {
  check.pathname = '/' + check.pathname.split('/')[1]
  var checkName = propertyUtils.getName(route[check.pathname])
  var checkVal = propertyUtils.getValue(route[check.pathname])
  var result = {}
  var checkDeal = {
    Lack: function() {
      for (var i = 0, len = checkName.length; i < len; i++) {
        if (!check.data.hasOwnProperty(checkName[i])) {
          result = { status: true, msg: 'The property of ' + checkName[i] + ' can not be lack' }
          break
        }
      }
      checkDeal['Null']()
    },
    Null: function() {
      for (var i = 0, len = checkName.length; i < len; i++) {
        if (check.data[checkName[i]] === '' || check.data[checkName[i]] === null) {
          result = { status: true, msg: 'The val of ' + checkName[i] + ' can not be null' }
          break;
        }
      }
      checkDeal['Type']()
    },
    Type: function() {
      for (var i = 0, len = checkName.length; i < len; i++) {
        if (typeof(check.data[checkName[i]]) !== checkVal[i]) {
          result = { status: true, msg: 'The ' + checkName[i] + ' val should be ' + checkVal[i] };
          break
        }
      }
      result = { status: false, msg: '' }
    }
  }
  checkDeal['Lack']()
  return result
};

exports.checkResult = function(req) {
  var result = checkMes({ pathname: req.url, data: req.query })
  return result;
}

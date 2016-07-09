var route = {
    '/api/getuserinfo': { user_id: 'string' },
    '/api/login': { username: 'string', password: 'string', email: 'string' },
    '/api/register': { username: 'string', password: 'string', ensure: 'string', email: 'string' },
    '/api/uploadblog': { title: 'string', content: 'string', tag: 'object' },
    '/api/getbloglist': { user_id: 'string' },
    '/api/getblogbyid': { blog_id: 'string' },
    '/api/delblog': { blog_id: 'string' }
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
  };
//check is the data lack
exports.isLack = function(formaturl) {
	console.log(formaturl.pathname);
  var pathname = formaturl.pathname,
    data = JSON.parse(formaturl._postData),
    checkName = getPropertyName(route[pathname]);
  for (var i = 0, len = checkName.length; i < len; i++) {
    if (!data.hasOwnProperty(checkName[i])) {
      return { status: true, msg: 'The ' + checkName[i] + ' is necessary' };
      break;
    }
  }
  return { status: false, msg: '' }
};
// check the val is null 
exports.isNull = function(formaturl) {
  var pathname = formaturl.pathname,
    data = JSON.parse(formaturl._postData),
    checkName = getPropertyName(route[pathname]);
  for (var i = 0, len = checkName.length; i < len; i++) {
    if (data[checkName[i]] === '' || data[checkName][i] === null) {
      return { status: true, msg: 'The val of ' + checkName[i] + ' can not be null' }
      break;
    }
  }
  return { status: false, msg: '' }
};
//check the val type
exports.isTypeError = function(formaturl) {
  var pathname = formaturl.pathname,
    data = JSON.parse(formaturl._postData),
    checkName = getPropertyName(data),
    checkVal = getPropertyVal(data);
  for (var i = 0, len = checkName.length; i < len; i++) {
    if (typeof(data[checkName[i]]) !== checkVal[i]) {
      return { status: true, msg: 'The ' + checkName[i] + ' val should be ' + checkVal[i] };
      break;
    }
  }
  return { status: false, msg: '' }
};

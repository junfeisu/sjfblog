var util = require("util");

exports.getuserinfo = function(req, res, formaturl) {
  var name = formaturl.query..name || "hello";
  //to transfer the object to string
  res.write(util.inspect(_postdata));
  res.end();
};

exports.login = function(req, res, formaturl) {
  var _postdata = formaturl._postdata;
  res.write(util.inspect(_postdata));
  res.end();
}

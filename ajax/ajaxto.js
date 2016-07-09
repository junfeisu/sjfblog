var User = require("../api/user").User,
  Blog = require('../api/blog').Blog,
  validate = require('./validate'),
  dealError = function(res, msg) {
    res.writeHead(403, {
      'Content-type': 'text/plain'
    });
    res.write(msg, 'utf8');
    res.end();
  }
routes = {
    "/api/getuserinfo": User.getuserinfo,
    "/api/login": User.login,
    "/api/register": User.signup,
    "/api/getbloglist": Blog.getbloglist,
    "/api/getblogbyid": Blog.getblogbyid,
    "/api/delblog": Blog.delblog,
    "/api/uploadblog": Blog.uploadblog,
    "/api/updateblog": Blog.updateblog
  },
  ajaxto = function(req, res, formaturl) {
    if (!validate.isLack(formaturl).status) {
      if (!validate.isNull(formaturl).status) {
        if (!validate.isTypeError(formaturl).status) {
          routes[formaturl.pathname](req, res, JSON.stringify(formaturl));
        } else {
          dealError(res, validate.isTypeError(formaturl).msg)
        }
      } else {
        dealError(res, validate.isNull(formaturl).msg)
      }
    } else {
      dealError(res, validate.isLack(formaturl).msg)
    }
  };

module.exports = ajaxto;

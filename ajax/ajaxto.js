var User = require("../api/user").User,
	Blog=require('../api/blog').Blog,
  routes = {
    "/api/getuserinfo": User.getuserinfo,
    "/api/login": User.login,
    "/api/register": User.signup,
    "/api/getbloglist": Blog.getbloglist,
    "/api/getblogbyid": Blog.getblogbyid,
    "/api/delblog": Blog.delblog,
    "/api/uploadblog": Blog.uploadblog
  },
  ajaxto = function(req, res, formaturl) {
    routes[formaturl.pathname](req, res, JSON.stringify(formaturl));
  };

module.exports = ajaxto;

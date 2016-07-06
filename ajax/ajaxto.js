var User=require("../api/user").User,
		routes={
			"/api/getuserinfo": User.getuserinfo,
			"/api/login": User.login,
			"/api/register": User.signup
		},
		ajaxto=function(req,res,formaturl){
			routes[formaturl.pathname](req,res,formaturl);
		};

module.exports=ajaxto;
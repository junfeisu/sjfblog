var User=require("../api/user"),
		routes={
			"/api/getuserinfo": User.getuserinfo,
			"/api/login": User.login
		},
		ajaxto=function(req,res,formaturl){
			routes[formaturl.pathname](req,res,formaturl);
		};

module.exports=ajaxto;
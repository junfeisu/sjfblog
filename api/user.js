var util = require("util");
		Operation=require('../static/operate').Operation;

exports.getuserinfo = function(req, res, formaturl) {
  //to transfer the object to string
  res.write(util.inspect({}));
  res.end();
};

exports.login = function(req, res, formaturl) {
	var data=JSON.parse(formaturl._postData);
	if(data.username===''||data.password===''){
	  res.writeHead(500,{});
		res.write("the password or username can't be null");
	}else{
		Oper
	}
  res.end();
};

exports.signup=function(req,res ,formaturl){
	var _postdata=formaturl._postdata;
	res.write(util.inspect(_postdata));
	res.end();
}

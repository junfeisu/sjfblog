var express = require('express');
var route = express.Router();
var mongo=require('../model/mongo').mongoUse;
var model= require('../model/schema').models;

route.get('/', function(req,res,next){
	res.send('This is Blog Api');
})

route.get('/me', function(res, req, next){
	var url=req.url;
	mongo.search(model.User, {}, function(err, result){
		err ?	console.log(err) : res.send(JSON.stringify(result))
	})
})
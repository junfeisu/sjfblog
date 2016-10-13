var express = require('express')
var route = express.Router()
var mongo=require('../model/mongo').mongoUse
var model= require('../model/schema').models

route.get('/', function(req,res,next){
	res.send('This is user Api')
})

route.get('/me', function(req, res, next){
	var url=req.url;
	mongo.search(model.User, {}, function(err, result){
		err ?	console.log(err) : res.json(result)
	})
})

module.exports=route

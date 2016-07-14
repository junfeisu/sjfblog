var express = require('express');
var route = express.Router();
var mongo = require('../model/mongo');
var validate = reuqire('../model/validate');
var model = require('../model/schema').models;

route.get('/', function(req, res){
  res.send('This is blog Api');
})

route.get('/getbloglist', function(req, res) {
  mongo.search(model.Blog, {}, function(err, result) {
    err ? console.log(err) : res.send(JSON.stringify(result))
  })
})

route.post('/getblogbyid', function(req, res) {
  var result = validate.checkResult(req);
  !result.status ? res.status(403).send(result.msg) : mongo.search(model.Blog, req.body, function(err, blog) {
    err ? concole.log(err) : res.send(JSON.stringify(blog))
  })
})

route.post('/getblogbytag', function(req, res) {
  var result = validate.checkResult(req);
  !result.status ? res.status(403).send(result.msg) : mongo.search(model.Blog, req.body, function(err, blog) {
    err ? console.log(err) : res.send(JSON.stringify(blog))
  })
})

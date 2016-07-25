var express = require('express');
var route = express.Router();
var mongo = require('../model/mongo').mongoUse;
var validate = require('../model/validate');
var model = require('../model/schema').models;
var fs = require('fs');
route.get('/', function(req, res) {
  res.send('This is blog Api');
})

route.get('/getbloglist', function(req, res) {
  mongo.search(model.Blog, {}, function(err, result) {
    err ? res.json(err) : res.json(result)
  })
})

route.post('/getblogbyid', function(req, res) {
  var result = validate.checkResult(req);
  result.status ? res.status(403).send(result.msg) : mongo.search(model.Blog, req.body, function(err, blog) {
    err ? res.json(err) : res.json(blog)
  })
})

route.post('/getblogbytag', function(req, res) {
  var result = validate.checkResult(req);
  result.status ? res.status(403).send(result.msg) : mongo.search(model.Blog, req.body, function(err, blog) {
    err ? res.json(err) : res.json(blog)
  })
})

module.exports = route;

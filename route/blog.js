var express = require('express');
var route = express.Router();
var mongo = require('../model/mongo').mongoUse;
var validate = require('../model/validate');
var model = require('../model/schema').models;
var fs = require('fs');
route.get('/', function(req, res) {
  res.send('This is blog Api');
})

route.param('pagesize', function(req, res, next) {
  next()
})

route.get('/getbloglist/:pagesize', function(req, res) {
  var result = validate.checkResult(req)
  var message = ([
    { $skip: (+req.params.pagesize - 1) * 1 },
    { $limit: 1 },
    { $sort: { time: -1 } }
  ])
  console.log('the message is ' + JSON.stringify(message))
  result.status ? res.status(403).send(result.msg) :
    mongo.aggregate(model.Blog, message, function(err, blog) {
      err ? res.status(500).json(err) : res.json(blog)
      // err ? console.log('the err is ' + err) : console.log('the blog is ' + blog)
    })
})

route.post('/getblogbyid', function(req, res) {
  var result = validate.checkResult(req);
  result.status ? res.status(403).send(result.msg) :
    mongo.search(model.Blog, req.body, function(err, blog) {
      err ? res.json(err) : res.json(blog)
    })
})

route.get('/getblogbytag/:pagesize', function(req, res) {
  var result = validate.checkResult(req)
  var message = (
    { $skip: (+req.body.pagesize - 1) * 10 },
    { $limit: 10 },
    { $sort: { time: -1 } }
  )
  result.status ? res.status(403).send(result.msg) :
    mongo.aggregate(model.Blog, message, function(err, blog) {
      err ? res.status(500).json(err) : res.json(blog)
    })
})

route.delete('/delblog', function(req, res) {
  var result = validate.checkResult(req)
  result.status ? res.status(403).send(result.msg) :
    mongo.remove(model.Blog, message, function(err, blog) {
      err ? res.status(500).json(err) : res.json(blog)
    })
})

module.exports = route;

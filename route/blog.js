var express = require('express');
var route = express.Router();
var mongo = require('../model/mongo').mongoUse;
var validate = require('../model/validate');
var model = require('../model/schema').models;
var fs = require('fs');
route.get('/', function(req, res) {
  res.send('This is blog Api');
})

route.param('cursor', function(req, res, next) {
  next()
})

route.param('tags', function(req, res, next) {
  next()
})

route.get('/getbloglist/:cursor', function(req, res) {
  var result = validate.checkResult(req)
  var message = ([
    { $match: { create_date: { $gte: req.params.cursor } } },
    { $limit: 10 },
    { $sort: { create_date: -1 } }
  ])
  result.status ? res.status(403).json(result.msg) :
    mongo.aggregate(model.Blog, message, function(err, blog) {
      err ? res.status(500).json(err) : res.json(blog)
    })
})

route.post('/getblogbyid', function(req, res) {
  var result = validate.checkResult(req);
  result.status ? res.status(403).json(result.msg) :
    mongo.search(model.Blog, req.body, function(err, blog) {
      err ? res.status(500).json(err) : res.json(blog)
    })
})

route.get('/getlistbytag/:cursor/:tags', function(req, res) {
  var result = validate.checkResult(req)
  var message = ([
    { $sort: { create_date: -1 } },
    { $limit: 10 },
    { $match: { tags: req.params.tags } }
  ])
  result.status ? res.status(403).json(result.msg) :
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

route.get('/getblogtype', function(req, res) {
  var result = {}
  mongo.aggregate(model.Blog, ([
      { $group: { _id: "$tags" } },
      { $unwind: "$_id" }
    ]),
    function(err, tag) {
      if (err) {
        res.status(500).json(err)
      } else {
        result.tags = tag
        mongo.aggregate(model.Blog, ([
            { $group: { _id: "$create_date" } } ,
            { $unwind: "$_id"}
          ]),
          function(err, time) {
            if(err) {
              res.status(500).json(err)
            } else {
              result.times = time
              console.log('type result is ' + result)
              res.json(result)
            }
          })
      }
    })
})

route.get('/getnewcursor', function(req, res) {
  mongo.aggregate(model.Blog, ([
      { $sort: { _id: -1 } },
      { $limit: 1 }
    ]),
    function(err, cursor) {
      err ? res.status(500).json(err) : res.json(cursor)
    })
})

module.exports = route;

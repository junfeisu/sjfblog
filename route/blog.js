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
    { $match: { create_date: { $lte: req.params.cursor } } },
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
  var tag = {}
  var result = {}
  var time = {}
  tag.map = function() {
    if (!this.tags) {
      return
    }
    for (index in this.tags) {
      emit(this.tags[index], 1)
    }
  }
  tag.reduce = function(key, values) {
    var count = 0
    for (index in values) {
      count += values[index]
    }
    return count
  }
  time.map = function() {
    emit(this.create_date, 1)
  }
  time.reduce = function(key, values) {
    return Array.sum(values)
  }
  mongo.mapreduce(model.Blog, tag, function(err, tags) {
    if (err) {
      res.status(500).json(err)
    } else {
      result.tags = tags
      mongo.mapreduce(model.Blog, time, function(err, times) {
        if (err) {
          res.status(500).json(err)
        } else {
          result.times = times
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

route.get('/nearblog/:cursor', function(req, res) {
  var result = {}
  model.Blog.find({create_date: {$gt: req.params.cursor}}).sort({create_date: 1}).hint({create_date: 1}).limit(1)
})

route.get('nextblog/:cursor', function(req, res) {

})

module.exports = route;

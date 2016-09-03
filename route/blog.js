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

route.get('/getbloglist/:cursor/:tags/:time', function(req, res) {
  var result = validate.checkResult(req)
  var matchMessage = {
    tags: '',
    create_date: '',
  }
  var newResult = {
    blogs: [],
    total: ''
  }
  var message = [
    { $match: matchMessage },
    { $sort: { create_date: -1 } },
    { $limit: 10 }
  ]
  // message.unshift({ $match: { create_date: { $lte: req.params.cursor } } })
  // message.unshift({ $match: { tags: /req.params.tags.+/, create_date: { $lte: req.params.cursor } } })
  if (req.params.tags === 'null' && req.params.time === 'null' && req.params.cursor === 'null') {
    message.shift()
  } else if (req.params.tags === 'null' && req.params.time === 'null') {
    delete matchMessage.tags
    matchMessage.create_date = { $lte: req.params.cursor }
  } else if (req.params.tags === 'null' && req.params.cursor === 'null') {
    delete matchMessage.tags
    matchMessage.create_date = new RegExp("^" + req.params.time + ".+")
  } else if (req.params.cursor === 'null' && req.params.time === 'null') {
    delete matchMessage.create_date
    matchMessage.tags = req.params.tags
  }
  console.log(message)
  result.status ? res.status(403).json(result.msg) :
    mongo.aggregate(model.Blog, message, function(err, blog) {
      if (err) {
        res.status(500).json(err)
      } else {
        newResult.blogs = blog
        mongo.search(model.Blog, {}, function(err, count){
          newResult.total = count.length
          res.json(newResult)
        })
      }
    })
})

route.post('/getblogbyid', function(req, res) {
  var result = validate.checkResult(req)
  result.status ? res.status(403).json(result.msg) :
    mongo.search(model.Blog, req.body, function(err, blog) {
      err ? res.status(500).json(err) : res.json(blog)
    })
})

// delete the blog
route.delete('/delblog', function(req, res) {
  var result = validate.checkResult(req)
  result.status ? res.status(403).send(result.msg) :
    mongo.remove(model.Blog, message, function(err, blog) {
      err ? res.status(500).json(err) : res.json(blog)
    })
})

// get the whole blog tags and the timestamp
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
    var tmp = this.create_date.split(':')[0]
    emit(tmp.split('-')[0] + '-' + tmp.split('-')[1], 1)
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

// get the latest blog create_date
route.get('/getnewcursor', function(req, res) {
  mongo.aggregate(model.Blog, ([
      { $sort: { _id: -1 } },
      { $limit: 1 }
    ]),
    function(err, cursor) {
      err ? res.status(500).json(err) : res.json(cursor)
    })
})

// get the prev blog and next blog
route.get('/getnearblog/:cursor', function(req, res) {
  var result = {}
  console.log('nearblog')
  model.Blog.find({ create_date: { $gt: req.params.cursor } },
    function(err, nextBlog) {
      if (err) {
        res.status(500).json(err)
      } else {
        result.nextBlog = (JSON.stringify(nextBlog) === '[]' ? {} : nextBlog[0])
        model.Blog.find({ create_date: { $lt: req.params.cursor } },
          function(err, prevBlog) {
            if (err) {
              res.status(500).json(err)
            } else {
              result.prevBlog = (JSON.stringify(prevBlog) === '[]' ? {} : prevBlog[0])
              res.json(result)
            }
          }).sort({ create_date: -1 }).limit(1)
      }
    }).sort({ create_date: 1 }).limit(1)
})

module.exports = route;

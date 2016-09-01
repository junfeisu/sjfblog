var express = require('express');
var route = express.Router();
var mongo = require('../model/mongo').mongoUse;
var validate = require('../model/validate');
var model = require('../model/schema').models;
var fs = require('fs');
route.get('/', function(req, res) {
  res.send('This is blog Api');
})

// route.param('cursor', function(req, res, next) {
//   next()
// })

// route.param('tags', function(req, res, next) {
//   next()
// })

route.get('/getbloglist/', function(req, res) {
  var result = validate.checkResult(req)
  var newResult = {
    blogs: [],
    total: ''
  }
  console.log('134')
  console.log('req.params.tags is ' + JSON.stringify(req))
  var message = ([
    { $match: { create_date: { $lte: req.params.cursor } } },
    { $limit: 10 },
    { $sort: { create_date: -1 } }
  ])
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

route.get('/getlistbytag/:tags', function(req, res) {
  var result = validate.checkResult(req)
  var message = ([
    { $sort: { create_date: -1 } },
    { $limit: 10 },
    { $match: { tags: req.params.tags } }
  ])
  result.status ? res.status(403).json(result.msg) :
    mongo.aggregate(model.Blog, message, function(err, blog) {
      err ? res.status(500).json(err) : res.json({total: blog.length, blogs: blog})
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
        console.log('2143')
        model.Blog.find({ create_date: { $lt: req.params.cursor } },
          function(err, prevBlog) {
            if (err) {
              res.status(500).json(err)
            } else {
              result.prevBlog = (JSON.stringify(prevBlog) === '[]' ? {} : prevBlog[0])
              console.log('result is ' + JSON.stringify(result))
              res.json(result)
            }
          }).sort({ create_date: -1 }).limit(1)
      }
    }).sort({ create_date: 1 }).limit(1)
})

module.exports = route;

var express = require('express')
var route = express.Router()
var mongo = require('../model/mongoOperate').mongoUse
// var validate = require('../model/validate')
var model = require('../model/schema').models
var fs = require('fs')
route.get('/', function(req, res) {
  res.send('This is blog Api')
})

route.get('/bloglist', function(req, res) {
  var matchMessage = {}
  var newResult = { blogs: [], total: ''}
  var message = [
    { $match: matchMessage },
    { $sort: { create_date: -1 } },
    { $skip: 7 * (req.query.page_size - 1) },
    { $limit: 7 }
  ]

  for (var i in req.query) {
    if (req.query.hasOwnProperty(i) && req.query[i]) {
      if (i === 'create_date') {
        matchMessage['create_date'] = new RegExp("^" + req.query[i] + ".+")
      } else {
        matchMessage[i] = req.query[i]
      }
    }
    delete matchMessage.page_size
  }

  mongo.aggregate(model.Blog, message, function(err, blog) {
    if (err) {
      res.status(500).json(err)
    } else {
      newResult.blogs = blog
      mongo.search(model.Blog, matchMessage, function(err, count){
        newResult.total = count.length
        res.json(newResult)
      })
    }
  })
})

route.post('/blogbyid', function(req, res) {
  mongo.search(model.Blog, req.body, function(err, blog) {
    err ? res.status(500).json(err) : res.json(blog[0])
  })
})

// delete the blog
route.delete('/delblog', function(req, res) {
  mongo.remove(model.Blog, message, function(err, blog) {
    err ? res.status(500).json(err) : res.json(blog)
  })
})

// get the whole blog tags and the timestamp
route.get('/blogtype', function(req, res) {
  var tag = {}
  var result = {}
  
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
  
  mongo.mapReduce(model.Blog, tag, function(err, tags) {
    if (err) {
      res.status(500).json(err)
    } else {
      res.set('Accept-Encoding', 'compress,gzip')
      res.json(tags)
    }
  })
})

route.get('/blogdate', function (req, res) {
  var time = {}

  time.map = function() {
    var tmp = this.create_date.split(':')[0]
    emit(tmp.split('-')[0] + '-' + tmp.split('-')[1], 1)
  }
  time.reduce = function(key, values) {
    return Array.sum(values)
  }

  mongo.mapReduce(model.Blog, time, function(err, times) {
    if (err) {
      res.status(500).json(err)
    } else {
      res.set('Accept-Encoding', 'compress,gzip')
      res.json(times)
    }
  })
})

// get the prev blog and next blog
route.get('/nearblog', function(req, res) {
  var result = {}
  model.Blog.find({ create_date: { $gt: req.query.cursor } },
    function(err, nextBlog) {
      if (err) {
        res.status(500).json(err)
      } else {
        result.nextBlog = (JSON.stringify(nextBlog) === '[]' ? {} : nextBlog[0])
        model.Blog.find({ create_date: { $lt: req.query.cursor } },
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

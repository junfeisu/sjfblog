import express from 'express'
import fs from 'fs'
import blogModel from '../model/schema'
import mongoose from 'mongoose'
import EventEmitter from 'events'

const route = express.Router()
const emitter = new EventEmitter()

declare function emit(k, v)

route.get('/', function(req, res): void {
  console.log('test')
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
    delete matchMessage['page_size']
  }

  blogModel.aggregate(message, function(err, blog) {
    if (err) {
      res.status(500).json(err)
    } else {
      newResult.blogs = blog
      blogModel.find(matchMessage, function(err, count) {
        newResult.total = count.length
        res.json(newResult)
      })
    }
  })
})

route.post('/blogbyid', function(req, res) {
  blogModel.find(req.body, function(err, blog) {
    err ? res.status(500).json(err) : res.json(blog[0])
  })
})

var getDate = function (options) {
  var time = {
    map: () => {},
    reduce: (key: any, values: any) => Array
  }

  time.map = function() {
    var tmp = this['create_date'].split(':')[0]
    emit(tmp.split('-')[0] + '-' + tmp.split('-')[1], 1)
  }
  time.reduce = function(key, values) {
    return mongoose.Array.sum(values)
  }

  blogModel.mapReduce(time, function(err, times) {
    if (err) {
      options.res.status(500).json(err)
    } else {
      options.result.times = times
      options.res.set('Accept-Encoding', 'compress,gzip')
      options.res.json(options.result)
    }
  })
}

emitter.on('date', getDate)

// get the whole blog tags and the timestamp
route.get('/blogtype', function(req, res) {
  var tag = {
    map: () => {},
    reduce: (key: any, values: any) => {}
  }
  var result = {}

  tag.map = function() {
    if (!this['tags']) {
      return
    }
    for (var index in this['tags']) {
      emit(this['tags'][index], 1)
    }
  }
  tag.reduce = function(key, values) {
    var count = 0
    for (var index in values) {
      count += values[index]
    }
    return count
  }
  
  blogModel.mapReduce(tag, function(err, tags) {
    if (err) {
      res.status(500).json(err)
    } else {
      result['tags'] = tags
      emitter.emit('date', {
        res: res,
        result: result
      })
    }
  })
})

var getPrevBlog = function (options) {
  blogModel.find({ create_date: { $lt: options.cursor } },
    function(err, prevBlog) {
      if (err) {
        options.res.status(500).json(err)
      } else {
        options.result.prevBlog = (JSON.stringify(prevBlog) === '[]' ? {} : prevBlog[0])
        options.res.json(options.result)
      }
    }).sort({ create_date: -1 }).limit(1)
}

emitter.on('prevBlog', getPrevBlog)

// get the prev blog and next blog
route.get('/nearblog', function(req, res) {
  var result = {}
  var cursor = req.query.cursor
  blogModel.find({ create_date: { $gt: cursor } },
    function(err, nextBlog) {
      if (err) {
        res.status(500).json(err)
      } else {
        result['nextBlog'] = (JSON.stringify(nextBlog) === '[]' ? {} : nextBlog[0])
        emitter.emit('prevBlog', {
          res: res,
          result: result,
          cursor: cursor
        })
      }
    }).sort({ create_date: 1 }).limit(1)
})

export default route

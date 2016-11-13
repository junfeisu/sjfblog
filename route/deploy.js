var express = require('express')
var route = express.Router()
var deal = require('./../model/deal')
var exec = require('child_process').exec

var judge = {
  // 重新build静态资源
  build: function (result) {
    var staticReg = /^static/
    result.forEach(value => {
      if (staticReg.test(value.path)) {
        deal.build()
      }
    })
    judge.blog(result)
  },
  // 对博客的操作
  blog: function (result) {
    var mdReg = /^md2html\/source\//
    result.forEach(value => {
      if (mdReg.test(value.path)) {
        deal[value.tag + 'Blog'](value.path)
      }
    })
  },
  install: function (result) {
    var insReg = /^package.json$/
    result.forEach(value => {
      if (insReg.test(value.path)) {
        deal.install()
      }
    })
  }
}

route.post('/', function (req, res) {
  try{
    exec('git pull', {'cwd': '/home/www/sjfblog'}, function (err, stdout, stderr) {
      if (err !== null) {
        res.json('err is ' + JSON.stringify(err))
      } else {
        var commits = req.body.commits[0]
        var result = []
        if (commits.removed.length !== 0) {
          commits.removed.forEach(value => {
            result.push({tag: 'remove', path: value})
          })
        }
        if (commits.added.length !== 0) {
          commits.added.forEach(value => {
            result.push({tag: 'add', path: value})
          })
        }
        if (commits.modified.length !== 0) {
          commits.modified.forEach(value => {
            result.push({tag: 'update', path: value})
          })
        }
        judge.build(result)
      }
    })
  } catch(e) {
    res.status(500).json(e)
  }
})

module.exports = route

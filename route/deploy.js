var express = require('express')
var route = express.Router()
var deal = require('./../model/deal')
var exec = require('child_process').exec

var judge = {
  build: function (result) {
    var staticReg = /^static/
    result.forEach(value => {
      if (staticReg.test(value.path)) {
        deal.build()
      }
    })
    judge.blog()
  },
  blog: function (result) {
    var mdReg = /^md2html\/source\//
    result.forEach(value => {
      if (mdReg.test(value.path)) {
        deal[value.tag + 'Blog'](value.path)
      }
    })
  }
}

route.post('/', function (req, res) {
  console.log('req.body.commits is ' + JSON.stringify(req.body.commits))
  exec('git pull', {'cwd': '/home/www/sjfblog'}, function (err, stdout, stderr) {
    if (err !== null) {
      res.json('err is ' + JSON.stringify(err))
    } else {
      res.send('success')
      var commits = req.body.commits
      var result = commits.added.concat(commits.removed, commits.modifed)
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
})

module.exports = route

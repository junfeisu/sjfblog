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
  console.log('req is ' + req)
  // exec('git pull', {'cwd': '/home/www/sjfblog'}, function (err, stdout, stderr) {
  //   if (err !== null) {
  //     res.json('err is ' + JSON.stringify(err))
  //   } else {
  //     var result = req.commits.added.concat(req.commits.removed, req.commits.modifed)
  //     if (req.commits.removed.length !== 0) {
  //       req.commits.removed.forEach(value => {
  //         result.push({tag: 'remove', path: value})
  //       })
  //     }
  //     if (req.commits.added.length !== 0) {
  //       req.commits.added.forEach(value => {
  //         result.push({tag: 'add', path: value})
  //       })
  //     }
  //     if (req.commits.modified.length !== 0) {
  //       req.commits.modified.forEach(value => {
  //         result.push({tag: 'update', path: value})
  //       })
  //     }
  //     judge.build(result)
  //   }
  // })
})

module.exports = route

var express = require('express')
var route = express.Router()
var exec = require('child_process').exec
var getMd = require('./../md2html/getmd')
route.post('/', function (req, res) {
  exec('git pull', {'cwd': '/home/www/sjfblog'}, function (err, stdout, stderr) {
    if (err !== null) {
      res.json('err is ' + JSON.stringify(err))
    } else {
      getMd.auth()
    }
  })
})

module.exports = route

var express = require('express')
var route = express.Router()
var exec = require('child_process').exec

route.post('/webhook', function (req, res) {
  exec('git pull', {'cwd': '/home/www/sjfblog'}, function (err, stdout, stderr) {
    if (err !== null) {
      res.send('err is ' + JSON.stringify(err))
    } else {
      res.send('stdout is ' + stdout)
    }
  })
})

module.exports = route

var mongo = require('../model/mongo.js').mongoUse
var markdown = require('../node_modules/markdown').markdown
var model = require('../model/schema').models
var exec = require('child_process').exec
var fs = require('fs')

var path = 'https://github.com'
var rawPath = 'https://raw.githubusercontent.com'

var deal = {
  addBlog: function (value) {
    var mes = deal.getContent(value)
    if (mes !== null) {
      mongo.add(new model['Blog'](mes), function (err, blog) {
        err ? deal.addLog('add blog error is ' + JSON.stringify(err), null) : 
          deal.addLog(null, 'add blog is ' + JSON.stringify(blog))
      })
    }
  },
  build: function () {
    exec('cnpm i && npm run build',
       {'cwd': '/home/www/sjfblog/static'},
       function (err, stdout, stderr) {
         err ? deal.addLog('cnpm i && npm run build error is ' + JSON.stringify(err), null) : 
          res.json('stdout and stderr is ' + JSON.stringify(stdout) + ' ' + JSON.stringify(stderr))
    })
  },
  install: function () {
    exec('cnpm i', 
      {'cwd': '/home/www/sjfblog'},
      function (err, stdout, stderr) {
        err ? deal.addLog('cnpm i error is ' + JSON.stringify(err), null) : 
          res.json('stdout and stderr is ' + JSON.stringify(stdout) + ' ' + JSON.stringify(stderr))
      })
  },
  getContent: function (value) {
    var result = fs.readFileSync('/home/www/sjfblog/' + value, 'utf-8')
    if (result) {
      var slice = result.split('---')
      var blogMes = {tags: []}
      // 去除换行符
      var message = slice[1].replace(/\n/g, '')
      var re = /^title: |tags: |date: /g
      // change the (title: 123tag: 2434 fsdfsdate: 2016-09-25) to (,123,2434 fsdfs,2016-09-25)
      // split the (,123,2434 fsdfs,2016-09-25) to ['', '123', '2434 fsdfs', '2016-09-25']
      message = message.replace(re, ",").split(',')
      blogMes.title = message[1]
      blogMes.create_date = message[3]
      message[2].split(' ').forEach(function(value) {
        blogMes.tags.push(value)
      })
      blogMes.content = markdown.toHTML(slice[2])
      return blogMes
    } else {
      return null
    }
  },
  removeBlog: function (value) {
    mongo.remove(model.Blog, 
      {title: value.split('source/')[1].split('.md')[0]}, 
      function (err, blog) {
        err ? deal.addLog('remove err is ' + JSON.stringify(err), null) : 
          deal.addLog(null, 'remove blog is ' + JSON.stringify(blog))
    })
  },
  updateBlog: function (value) {
    var mes = deal.getContent(value)
    if (mes !== null) {
      mongo.update(model.Blog, 
        ({title: mes.title}, {$set: {content: mes.content}}), 
        function (err, blog) {
          err ? deal.addLog('update err is ' + JSON.stringify(err), null) : 
            deal.addLog(null, 'update blog is ' + JSON.stringify(blog))
      })
    }
  },
  addLog: function (err, data) {
    var fileName = new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
    fs.open(`./blogLog/${fileName}.log`, 'a', function (e, fd) {
      if (e) {
        throw new Error(e)
      }
      fs.write(fd, data, function (error) {
        err ? throw new Error(error) : console.log('add log success')
      })
      fs.closeSync(fd)
    })
  }
}

module.exports = deal

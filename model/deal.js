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
    console.log('add mes is ' + JSON.stringify(mes))
    if (mes !== null) {
      mongo.add(new model['Blog'](mes), function (err, blog) {
        console.log('add blog is ' + JSON.stringify(blog))
        err ? console.log('err is ' + err) : console.log('add success')
      })
    }
  },
  build: function () {
    console.log('deal is execute')
    exec('npm run build',
       {'cwd': '/home/www/sjfblog/static'},
       function (err, stdout, stderr) {
          if (err) {
            console.log('exec err is ' + err)
          } else {
            console.log('stdout is' + stdout)
            console.log('stderr is' + stderr)
          }
    })
  },
  getContent: function (value) {
    console.log('getContent is execute')
    var result = fs.readFileSync('/home/www/sjfblog/' + value, 'utf-8')
    console.log('result is' + result)
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
      console.log('blogMes is ' + JSON.stringify(blogMes))
      return blogMes
    } else {
      return null
    }
  },
  removeBlog: function (value) {
    console.log('value is ' + value)
    mongo.remove(model.Blog, {title: value.split('source/')[1].split('.md')[0]}, function (err, blog) {
      console.log('remove blog is ' + JSON.stringify(blog))
      err ? console.log('err is ' + err) : console.log('remove success')
    })
  },
  updateBlog: function (value) {
    var mes = deal.getContent(value)
    console.log('mes is ' + JSON.stringify(mes))
    if (mes !== null) {
      mongo.update(model.Blog, ({title: mes.title}, {$set: {content: mes.content}}), 
          function (err, blog) {
            console.log('update blog is ' + JSON.stringify(blog))
            err ? console.log('err is ' + err) : console.log('update success')
      })
    }
  }
}

module.exports = deal

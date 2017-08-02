var mongo = require('../model/mongo.js').mongoUse
var markdown = require('../node_modules/markdown').markdown
var model = require('../model/schema').models
var fs = require('fs')

var path = 'https://github.com'
var rawPath = 'https://raw.githubusercontent.com'

var deal = {
  addBlog: function (value) {
    var mes = deal.getContent(value)
    if (mes !== null) {
      mongo.add(new model['Blog'](mes), function (err, blog) {
        err ? deal.addLog('add ' + mes.title + ' error is ' + JSON.stringify(err), null) : 
          deal.addLog(null, 'add blog ' + mes.title + ' is ' + JSON.stringify(blog.n))
      })
    }
  },
  getContent: function (value) {
    var result = fs.readFileSync('/home/www/sjfblog/' + value, 'utf-8')
    if (result) {
      var reg = /^---\n(.+\n){3}---\n/g
      headerInfo = result.match(reg)
      result = result.replace(reg, '')
      if (headerInfo.length) {
        headerInfo = headerInfo.replace(/---|\n/g, '')
        var blogMes = {tags: []}
        // 去除换行符
        var re = /^title: |tags: |date: /g
        // change the (title: 123tag: 2434 fsdfsdate: 2016-09-25) to (,123,2434 fsdfs,2016-09-25)
        // split the (,123,2434 fsdfs,2016-09-25) to ['', '123', '2434 fsdfs', '2016-09-25']
        headerInfo = headerInfo.replace(re, ",").split(',')
        blogMes.title = headerInfo[1]
        blogMes.create_date = headerInfo[3]
        headerInfo[2].split(' ').forEach(function(value) {
          blogMes.tags.push(value)
        })
        blogMes.content = markdown.toHTML(slice[2])
        return blogMes
      }
    } else {
      return null
    }
  },
  removeBlog: function (value) {
    mongo.remove(model.Blog, 
      {title: value.split('source/')[1].split('.md')[0]}, 
      function (err, blog) {
        err ? deal.addLog('remove ' + value.split('source/')[1].split('.md')[0] + ' err is ' + JSON.stringify(err), null) : 
          deal.addLog(null, 'remove ' + value.split('source/')[1].split('.md')[0] + ' is ' + JSON.stringify(blog.n))
    })
  },
  updateBlog: function (value) {
    console.log('updateBlog')
    var mes = deal.getContent(value)
    if (mes !== null) {
      mongo.update(model.Blog, 
        ({title: mes.title}, {$set: {content: mes.content}}), 
        function (err, blog) {
          err ? deal.addLog('update ' + mes.title + ' err is ' + JSON.stringify(err), null) : 
            deal.addLog(null, 'update' + mes.title + ' num is ' + JSON.stringify(blog.nModified))
      })
    }
  },
  addLog: function (err, data) {
    var fileName = new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
    fs.open(`./blogLog/${fileName}.log`, 'a', err, function (e, fd) {
      if (e) {
        console.log(e)
      }
      fs.write(fd, data + '\n', function (error) {
        err ? console.log('write error is ' + error) : console.log('add log success')
      })
      fs.closeSync(fd)
    })
  }
}

module.exports = deal

var superagent = require('superagent')
var cheerio = require('cheerio')
var fs = require('fs')
var mongo = require('../model/mongo.js').mongoUse
var markdown = require('../node_modules/markdown').markdown
var model = require('../model/schema').models
var path = 'https://github.com'
var rawPath = 'https://raw.githubusercontent.com'
var sortArr = function(property, obj) {
  return obj.sort(function(obj1, obj2) {
    var val1 = obj1[property]
    var val2 = obj2[property]
    if (val1 < val2) {
      return -1
    } else if (val1 === val2) {
      return 0
    } else {
      return 1
    }
  })
}

var getFile = {
  // get the auth-key and cookie_id
  auth: function() {
    superagent.get(path + '/login')
      .end(function(err, res) {
        if (err) {
          console.log(err)
          return
        }
        var cookie_id = res.headers['set-cookie'][1].split(';')[0]
        var $ = cheerio.load(res.text)
        var auth_key = $('input[name="authenticity_token"]').val()
        getFile.login(auth_key, cookie_id)
      })
  },
  // auto login in github 
  login: function(auth, cookie_id) {
    superagent.post(path + '/session')
      .type('form')
      .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
      .set('Cookie', 'logged_in=no;' + cookie_id + '; _ga=GA1.2.449091290.1464421985; tz=Asia%2FShanghai; _octo=GH1.1.325412906.1464421982; _gat=1;')
      .send({
        'commit': 'Sign in',
        'utf8': '✓',
        'login': '1982764150@qq.com',
        'password': 'sjf978977',
        'authenticity_token': auth
      })
      .end(function(err, res) {
        err ? console.log(err) : getFile.selectMdList()
      })
  },
  // select the md file in github
  selectMdList: function() {
    superagent.get(path + '/junfeisu/sjfblog/tree/master/md2html/source')
      .end(function(err, res) {
        var md = []
        var $ = cheerio.load(res.text)
        var val = $('.js-navigation-open')
        var date = new Date()
        var month = date.getMonth() + 1
          // check the directory to store md file is existes or not
        fs.exists('./' + date.getFullYear() + '-' + month, function(exists) {
          exists ? console.log('The directory is existed') :
            fs.mkdir('./' + date.getFullYear() + '-' + month, function(err) {
              err ? console.log('the mkdir err is ' + err) : console.log('mkdir success')
            })
        })
        // 把source目录下的md文件push进md
        for(var i = 0; i < val.length; i++) {
          md.push(val[i].attribs.href.split('source/')[1])
        }
        md.forEach(function (value, index) {
          value = decodeURI(value)
          if (/^[\u4e00-\u9fa5\w]+\.md$/.test(value)) {
            var exist = fs.existsSync('./' + date.getFullYear() + '-' + month + '/' + value)
            exist ? console.log('the file is exist already') : getFile.getContent(value)
          } else {
            console.log('there is no new md')
          }
        })
      })
  },
  // get the content of md file
  getContent: function(md) {
    superagent.get(rawPath + "/junfeisu/sjfblog/master/md2html/source/" + encodeURI(md))
      .end(function(error, result) {
        if (error) {
          console.log('the get md content err is ' + error)
        } else {
          var date = new Date()
          var month = +date.getMonth() + 1
          var sortedRes = []
            // analysis the md file content and create the blogMes
          var slice = result.text.split('---')
          var blogMes = {tags: []}
          // 去除换行符
          var message = slice[1].replace(/\n/g, '')
          var re = /^title: |tags: |date: /g
          // change the (title: 123tag: 2434 fsdfsdate: 2016-09-25) to (,123,2434 fsdfs,2016-09-25)
          // split the (,123,2434 fsdfs,2016-09-25) to ['', '123', '2434 fsdfs', '2016-09-25']
          message = message.replace(re, ",").split(',')
          blogMes.title = message[1]
          blogMes.date_create = message[3]
          message[2].split(' ').forEach(function(value) {
            blogMes.tags.push(value)
          })
          blogMes.content = markdown.toHTML(slice[2])
          sortedRes.push(blogMes)
          sortArr('create_date', sortedRes)
            // to check the md file is exist or not
          fs.writeFileSync('./' + date.getFullYear() + '-' + month + '/' + md, result.text, 'utf-8')
            // to write the data to mongodb
          sortedRes.forEach(function(value, index) {
            mongo.add(new model['Blog']({
              title: value.title,
              content: value.content,
              tags: value.tags,
              create_date: value.date_create
            }), function(err, result) {
              err ? console.log('the write data into mongo err is ' + err) :
                console.log('fetch success')
            })
          })
        }
      })
  }
}

exports.getFile

var cron = require('cron').CronJob
var superagent = require('superagent')
var cheerio = require('cheerio')
var path = 'https://github.com'
var rawPath = 'https://raw.githubusercontent.com'
var fs = require('fs')
var mongo = require('../model/mongo.js').mongoUse
var markdown = require('../node_modules/markdown').markdown
var model = require('../model/schema').models

var getFile = {
  // get the auth-key and cookie_id
  auth: function() {
    superagent.get(path + '/login')
      .end(function(err, res) {
        if (err)
          console.log(err)
        var cookie_id = res.headers['set-cookie'][1].split(';')[0]
        var $ = cheerio.load(res.text)
        var auth_key = $('input[name="authenticity_token"]').val()
        getFile.login(auth_key, cookie_id)
      })
  },
  // login in github 
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
        for (var i = 2; i < val.length; i++) {
          md.push(val[i].attribs.href.split('source/')[1]);
        }
        for (var j = 0; j < md.length; j++) {
          md[j] = decodeURI(md[j])
          if (/^[\u4e00-\u9fa5\w]+\.md$/.test(md[j]) {
            var exist = fs.existsSync('./' + date.getFullYear + '-' + date.getMonth() + 1 + '/' + md[j])
            if (exist) {
              console.log('the file is exist already')
            } else {
              getFile.getContent(md[j])
            }
          }else {
            console.log('there is no new md')
          }
        }
      })
  },
  // get the content of md file
  getContent: function(md) {
    superagent.get(rawPath + "/junfeisu/sjfblog/master/md2html/source/" + md)
      .end(function(error, result) {
        if (error) {
          console.log('err is ' + error)
        }
        var slice = result.text.split('---')
        var blogMes = {
          tags: []
        }
        var date = new Date()
        var month = date.getMonth() + 1;
        var message = slice[1].replace(/\n/g, '')
        var tags = (message.split('title: ')[1]).split('tags: ')[1].split('date: ')[0]
        blogMes.title = (message.split('title: ')[1]).split('tags: ')[0]
        tags.split(' ').forEach(function(value) {
          blogMes.tags.push(value)
        })
        blogMes.date_create = (message.split('title: ')[1]).split('tags: ')[1].split('date: ')[1]
        blogMes.content = markdown.toHTML(slice[2])
        fs.writeFileSync('./' + date.getFullYear() + '-' + month + '/' + md, result.text, 'utf-8')
        mongo.add(new model['Blog']({
          title: blogMes.title,
          content: blogMes.content,
          tags: blogMes.tags,
          date_create: blogMes.date_create
        }), function(err, result){
          err ? console.log('add err is ' + err) : console.log('result is ' + result)
        })
      })
  }
}

new cron('* */10 8-23  * * *', function() {
  getFile.auth()
}, null, true, 'Asia/Shanghai');

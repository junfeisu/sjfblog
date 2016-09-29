var cron = require('cron').CronJob
var superagent = require('superagent')
var cheerio = require('cheerio')
var fs = require('fs')
var mongo = require('../model/mongo.js').mongoUse
var markdown = require('../node_modules/markdown').markdown
var model = require('../model/schema').models
var path = 'https://github.com'
var rawPath = 'https://raw.githubusercontent.com'

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
    superagent.get(path + '/junfeisu/sjfblog/tree/vue/md2html/source')
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
        // console.log('val is ' + val)
        // val.forEach(function(value, index) {
        //   md.push(value.attribs.href.split('source/')[1])
        // })
        for(var i = 0; i < val.length; i++) {
          md.push(val[i].attribs.href.split('source/')[1])
        }
        for (var j = 0; j < md.length; j++) {
          md[j] = decodeURI(md[j]) //decodeURL the filename to Chinese or English
          if (/^[\u4e00-\u9fa5\w]+\.md$/.test(md[j])) {
            var exist = fs.existsSync('./' + date.getFullYear() + '-' + month + '/' + md[j])
            exist ? console.log('the file is exist already') : getFile.getContent(md[j])
          } else {
            console.log('there is no new md')
          }
        }
      })
  },
  // get the content of md file
  getContent: function(md) {
    superagent.get(rawPath + "/junfeisu/sjfblog/vue/md2html/source/" + encodeURI(md))
      .end(function(error, result) {
        if (error) {
          console.log('the get md content err is ' + error)
        } else {
          var date = new Date()
          var month = date.getMonth() + 1
          var sortedRes = []
          var sortArr = function(property, obj) {
              return obj.sort(function(obj1, obj2) {
                var val1 = obj1[property]
                var val2 = obj2[property]
                if(val1 < val2) {
                  return -1
                } else if(val1 === val2) {
                  return 0
                } else {
                  return 1
                }
              })
            }
            // analysis the md file content and create the blogMes
          var slice = result.text.split('---')
          var blogMes = {
            tags: []
          }
          var message = slice[1].replace(/\n/g, '')
          var tags = (message.split('title: ')[1]).split('tags: ')[1].split('date: ')[0]
          blogMes.title = (message.split('title: ')[1]).split('tags: ')[0]
          blogMes.date_create = (message.split('title: ')[1]).split('tags: ')[1].split('date: ')[1]
          tags.split(' ').forEach(function(value) {
            blogMes.tags.push(value)
          })
          blogMes.content = markdown.toHTML(slice[2])
          console.log(blogMes.content)
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

// new cron('* */10 8-23  * * *', function() {
  getFile.auth()
// }, null, true, 'Asia/Shanghai');

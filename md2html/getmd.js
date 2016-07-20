var cron = require('cron').CronJob;
var superagent = require('superagent');
var cheerio = require('cheerio');
var path = 'https://github.com'

// new cron('* *30 12-23 * * * *', function(){
superagent.get(path + '/login')
  .end(function(err, res) {
    if (err)
      console.log(err)
    var cookie_id = res.headers['set-cookie'][1].split(';')[0];
    var $ = cheerio.load(res.text);
    var auth_key = $('input[name="authenticity_token"]').val();
    superagent.post(path + '/session')
      .type('form')
      .set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
      .set('Cookie', 'logged_in=no;' + cookie_id + '; _ga=GA1.2.449091290.1464421985; tz=Asia%2FShanghai; _octo=GH1.1.325412906.1464421982; _gat=1;')
      .send({
        'commit': 'Sign in',
        'utf8': '✓',
        'login': '1982764150@qq.com',
        'password': 'sjf978977',
        'authenticity_token': auth_key
      })
      .end(function(err, res) {
        superagent.get(path + '/junfeisu/sjfblog/tree/master/md2html')
          .end(function(err, res) {
            var md = []
            var $ = cheerio.load(res.text);
            var val = $('.js-navigation-open')
            for (var i = 2; i < val.length; i++) {
              md.push(val[i].attribs.href.split('md2html/')[1])
            }
            for (var j = 0; j < md.length; j++) {
              if(/^[a-z]+\.md+$/.test(md[j])){
                superagent.get('https://raw.githubusercontent.com/junfeisu/sjfblog/master/md2html/' + md[j])
                  .end(function(err, res) {
                    if(err) {
                      console.log('err is ' + err)
                    }
                    console.log(res.text)
                  })
              }
            }
          })
      })
  })
  // },null, true, 'Asia/Shanghai');

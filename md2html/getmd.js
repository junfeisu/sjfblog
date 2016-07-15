var cron=require('cron').CronJob;
var superagent= require('superagent');
var cheerio=require('cheerio');

// new cron('* *30 12-23 * * * *', function(){
	superagent.get('https://github.com/login')
		.end(function(err,res){
			if(err)
				console.log(err)
			var $= cheerio.load(res.text);
			var auth_key=$('input[name="authenticity_token"]').val();
			superagent.post('https://github.com/session')
				.type('form')
				.send({
					'utf8': '✓',
          'login': '1982764150@qq.com',
          'password': 'sjf978977',
          'authenticity_token': auth_key
				})
				.end(function(err,res){
					if(err)
						console.log('err is' + err);
					else{
						console.log('res is '+ res);
					}
				})
		})
// },null, true, 'Asia/Shanghai');
var model = require('./model/schema').models

model.Blog.find({create_date: {$lt: '2016-7-26'}}, function(err, res) {
	err ? console.log('err is ' + err) : console.log('res is ' + res)
}).sort({create_date: 1}).limit(1)
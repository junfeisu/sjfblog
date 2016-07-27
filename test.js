var mongo = require('./model/mongo').mongoUse
var model = require('./model/schema').models

model['Blog'].aggregate([{$match: { author: 'sujunfei'}}], function(err, res) {
	err ? console.log('err is ' + err) : console.log(res)
})
var mongo = require('./model/mongo').mongoUse
var model = require('./model/schema').models

mongo.search(model['Blog'],{_id: "579466e83e6d29e871c83963"}, function(err ,result) {
	err ? console.log(err) : console.log(result)
})
var mongoose=require('./static/node_modules/mongoose'),
	Schema=mongoose.Schema;
	mongoose.connect('mongodb://localhost/test');

var peopleSchema=new Schema({
	name: String
})

var People=mongoose.model('People', peopleSchema);

var sujunfei=new People();

People.update({name: 'sujunfei'},{$set: {name : 'jjj'}}, function(err, result){
	console.log(result)
})
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Cat=mongoose.model('Cat',{
	name: String,
	friends: [String],
	age: Number
})

var kitty=new Cat({name:'sujunfei',friends:['jjj','scc','dy']});

kitty.save(function(err){
	if(err)
		console.log('there is some err')
})

var mongouse=require('mongoose'),
		Schema=mongoose.Schema,
	mongoMethod=require('./mongo').mongoUse,
	peopleSchema=new Schema({
		name: String,
		age: Number,
		girlFriend: String
	})
	People=mongoose.model('People',peopleSchema);
	sujunfei=new People({
		name:'sujunfei',
		age:19,
		girlFriend: 'jinjingjing'
	})

	mongoMethod.add(sujunfei);

	mongoMethod.update({age:19},{$set:{age:20},false,true});

	mongoMethod.search({name:'sujunfei'})
	
	mongoMethod.remove({name:'sujunfei'})

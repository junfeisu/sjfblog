var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  mongoMethod = require('./mongo').mongoUse,
  peopleSchema = new Schema({
    name: String,
    age: Number,
    girlFriend: String
  })
People = mongoose.model('People', peopleSchema);
mongoose.connect('mongodb://localhost/test');
sujunfei = new People({
  name: 'sujunfei',
  age: 19,
  girlFriend: 'jinjingjing'
})

mongoMethod.add(sujunfei);

mongoMethod.update({ age: 19 }, { $set: { age: 20 } }, People);

mongoMethod.search(People, { name: 'sujunfei' }, function(err, people) {
  console.log(people);
})

mongoMethod.remove({ name: 'sujunfei' }, People);

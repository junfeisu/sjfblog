var mongoose=require('mongoose'),
	Schema=mongoose.Schema;

exports.schemas={
	blogSchema:new Schema({
    title: String,
    date: String,
    content: String,
    comment: String,
    author: String,
  }),
  userSchema:new Schema({
    username: String,
    password: String,
  })
}
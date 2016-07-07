var mongoose=require('mongoose'),
	Schema=mongoose.Schema;
mongoose.connect('mongodb://localhost/test');

var schemas={
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
  }),
};

exports.schemas;

exports.models={
  User:mongoose.model('User',schemas.userSchema),
  Blog:mongoose.model('Blog',schemas.blogSchema)
}

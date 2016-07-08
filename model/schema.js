var mongoose = require('../static/node_modules/mongoose'),
  db = mongoose.connection,
  ObjectId=mongoose.Schema.Types.ObjectId,
  Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test');
var schemas = {
  blogSchema: new Schema({
    title: { type: String, required: true },
    create_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now },
    content: { type: String, required: true },
    author: String,
    tags: { type: [String], required: true },
    comment: {
      reviewer: String,
      content: String
    },
    blog_id: Number
  }, { versionKey: false }),
  userSchema: new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    create_date: {type: Date, default: Date.now }
  }, { versionKey: false })
};

schemas.userSchema.virtual('userId').get(function(){
  return this._id
})

schemas.userSchema.statics.findByName = function(name, cb) {
  return this.find({ username: new RegExp(name, 'i'), cb })
};

exports.models = {
  User: mongoose.model('User', schemas.userSchema),
  Blog: mongoose.model('Blog', schemas.blogSchema)
};
exports.schemas;

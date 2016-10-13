var mongoose = require('../node_modules/mongoose'),
  ObjectId = mongoose.Schema.Types.ObjectId,
  Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test')

var schemas = {
  blogSchema: new Schema({
    title: { type: String, required: true },
    create_date: { type: String, required: true },
    content: { type: String, required: true },
    author: String,
    tags: { type: [String], required: true },
  }, { versionKey: false }),
  userSchema: new Schema({
    username: { type: String, required: true },
    age: { type: String, required: true },
    user_icon: { type: String, required: true },
    description: { type: [String], required: true },
    skills: [{
      name: { type: String, required: true },
      degree: { type: String, required: true }
    }],
    email: { type: String, required: true },
    weixin: { type: String, required: true },
    phone: { type: String, required: true },
    QQ: { type: String, required: true },
    zhihu: { type: String, required: true },
    github: { type: String, required: true },
    create_date: { type: Date, default: Date.now }
  }, { versionKey: false })
};

schemas.userSchema.virtual('userId').get(function() {
  return this._id
})

schemas.userSchema.statics.findByName = function(name, cb) {
  return this.find({ username: new RegExp(name, 'i'), cb })
};

exports.models = {
  User: mongoose.model('User', schemas.userSchema),
  Blog: mongoose.model('Blog', schemas.blogSchema)
};

exports.schemas

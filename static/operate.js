var mongoose = require('mongoose'),
  schema = require('./schema').schemas,
  mongoMethod = require('./mongo').mongoUse,
  model = {
    User: mongoose.model('User', schema.userSchema),
    Blog: mongoose.model('Blog', schema.blogSchema)
  };
mongoose.connect('mongodb://localhost/test');

exports.Operation = {
  add: function(config) {
    var instance = {
      userSpecifc: new model.User(config.findMes),
      bolgSpecifc: new model.Blog(config.findMes)
    }
    mongoMethod.add(instance[config.type.toLowerCase() + 'Specifc']);
  },
  update: function(config) {
    mongoMethod.update(config.findMes, { $set: config.updateMes }, model[config.type]);
  },
  search: function(config) {
    mongoMethod.search(model[config.type], config.findMes, function(err, result) {
      if (err) {
        return 'ERROR';
      }
      return result;
    })
  },
  remove: function(config) {
    mongoMethod.remove(config.findMes, model[config.type])
  }
};

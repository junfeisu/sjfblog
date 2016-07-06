var mongoose = require('mongoose'),
  schema = require('./schema').schemas,
  mongoMethod = require('./mongo').mongoUse;
mongoose.connect('mongodb://localhost/test');

exports.Operation = function(config) {
  var model={
      User: mongoose.model('User', schema.userSchema),
      Blog: mongoose.model('Blog', schema.blogSchema)
    },
    operate = {
      add: function() {
        var instance = {
          userSpecifc: new User(config.findMes),
          bolgSpecifc: new Blog(config.findMes)
        }
        mongoUse.add(instance[config.type.toLowerCase() + 'Specifc']);
      },
      update: function() {
        mongoUse.update(config.findMes, { $set: config.updateMes }, model[config.type]);
      },
      search: function() {
        mongoUse.search(model[config.type], config.findMes, function(err, result) {
          if (err) {
            return 'ERROR';
          }
          return result;
        })
      },
      remove: function() {
        mongoUse.remove(config.findMes, model[config.type])
      }
    };
  for (var k in operate)
    Operation.prototype[k] = operate[k];
  return Operation;
}

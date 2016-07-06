var mongoose = require('mongoose'),
  schema = require('./schema').schemas,
  mongoMethod = require('./mongo').mongoUse;
mongoose.connect('mongodb://localhost/test');

exports.Operation = function(config) {
  var User = mongoose.model('User', schema.userSchema),
    Blog = mongoose.model('Blog', schema.blogSchema),
    model = config.type === 'Blog' ? Blog : User,
    operate = {
      add: function() {
        var instance = {
          userSpecifc: new User(config.mes),
          bolgSpecifc: new Blog(config.mes)
        }
        mongoUse.add(instance[config.type.toLowerCase() + 'Specifc']);
      },
      update: function() {
        mongoUse.update(config.findMes, { $set: config.updateMes }, model);
      },
      search: function() {
        mongoUse.search(model, config.mes, function(err, models) {
          if (err) {
            return 'There is no result you want';
          }
          return models;
        })
      },
      remove: function() {
        mongoUse.remove(config.mes, model)
      }
    };
  for (var k in operate)
    Operation.prototype[k] = operate[k];
  return Operation;
}

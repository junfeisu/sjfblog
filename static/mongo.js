//the operation of mongodb
exports.mongoUse = {
  add: function(entity) {
    entity.save(function(err) {
      if (err) {
        return 0;
      }
      return 1;
    })
  },
  update: function(message) {
    entity.update(message, function(err) {
      if (err) {
        return 0;
      }
      return 1;
    })
  },
  remove: function(message) {
    entity.remove(message, function(err) {
      if (err) {
        return 0;
      }
     return 1;
    })
  },
  search: function(model,message,cb) {
  	return model.find(message,cb)
  }
}



//the operation of mongodb crud
exports.mongoUse = {
  add: function(entity, cb) {
    entity.save(cb)
  },
  update: function(model, message, cb) {
    model.update(message, cb)
  },
  remove: function(model, message, cb) {
    model.remove(message, cb)
  },
  search: function(model, message, cb) {
    return model.find(message, cb)
  },
  aggregate: function(model, message, cb) {
    return model.aggregate(message, cb)
  },
  mapReduce: function(model, message, cb) {
    return model.mapReduce(message, cb)
  }
}

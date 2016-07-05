exports.mongoUse = {
  add: function(entity) {
    entity.save(function(err) {
      if (err) {
        console.log('storage failed');
        return;
      }
      console.log('meow');
    })
  },
  update: function(findMes, updateMes, model) {
    model.update(findMes, updateMes, function(err) {
      if (err) {
        console.log('update failed');
        return;
      }
      console.log('update successed');
    })
  },
  search: function(model, message, cb) {
    return model.find(message, cb)
  },
  remove: function(message, model) {
    model.remove(message, function(err) {
      if (err) {
        console.log('delete failed');
        return;
      }
      console.log('delete successed');
    })
  }
}

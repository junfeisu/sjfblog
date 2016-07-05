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
  update: function(message) {
    entity.update(message, function(err) {
      if (err) {
        console.log('update failed');
        return;
      }
      consoel.log('update successed');
    })
  },
  remove: function(message) {
    entity.remove(message, function(err) {
      if (err) {
        console.log('delete failed');
        return;
      }
      console.log('delete successed');
    })
  },
  search: function(model,message,cb) {
  	return model.find(message,cb)
  }
}



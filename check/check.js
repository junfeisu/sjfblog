var validate

exports.Check = {
  isNull: function(para) {
    for (var i = 0, len = para.length; i < len; i++) {
      if (para[i] === '' || para[i] === null) {
        return true;
        break;
      }
    }
    return false;
  },
  isLack: function(para) {
    for (var i = 0, len = para.length; i < len; i++) {

    }
  },
  isTypeError: function() {

  }
}

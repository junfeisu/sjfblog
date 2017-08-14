var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('connection has been established')
})

exports.connect = function () {}
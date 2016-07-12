// var express=require('express'),
//   path=require('path'),
//   body_parser=require('body-parser'),
//   config=require('./config'),
//   route=require('./routes/index'),
//   favivon=require('serve-favicon'),
//   app=express();

// var static_dir=path.join(__dirname,'static/dist'),
//   url_info=require('url').parse('localhost'),
//   config.hostname=urlinfo.hostname||config.host;
// app.use('/static/dist',express.static());
// app.use('views/', path.join(__dirname, 'views'));
// app.use('view engine','html');

// app.get('/',function(req,res){
//   res.send();
// })

// app.listen(9999,function(){
//   console.log('The blog is listening on port 9999');
// });

var server = require('./server'),
  route = require('./route/route'),
  init = (function() {
    return function() {
      var data = {
        data: null,
        err: ''
      }
      return data
    }
  })
global.Controller = require('./controller');
global.initData = init();
server.start(route);

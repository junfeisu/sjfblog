var express = require('express');
var route = express.Router();
var mongo = require('../model/mongo');
var validate = require('../model/validate');
var model = require('../model/schema').models;
var fs= require('fs');
route.get('/', function(req, res) {
  res.send('This is blog Api');
})

route.get('/getbloglist', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  mongo.search(model.Blog, {}, function(err, result) {
    err ? res.send(err) : res.send(JSON.stringify(result))
  })
})

route.post('/getblogbyid', function(req, res) {
  var result = validate.checkResult(req);
  !result.status ? res.status(403).send(result.msg) : mongo.search(model.Blog, req.body, function(err, blog) {
    err ? console.log(err) : res.send(JSON.stringify(blog))
  })
})

route.post('/getblogbytag', function(req, res) {
  var result = validate.checkResult(req);
  !result.status ? res.status(403).send(result.msg) : mongo.search(model.Blog, req.body, function(err, blog) {
    err ? console.log(err) : res.send(JSON.stringify(blog))
  })
})

route.post('/uploadmd', function(req, res) {
  console.log(req.file);
  // res.send(JSON.stringify(req));;
  var tmp_path=req.files.upload.path;
  var target_path='../md2html/2016-7/'+req.files.upload.name;
  fs.rename(tmp_path,target_path,function(){
    if(err)
      throw err;
    fs.unlink(tmp_path,function(){
      if(err)
        throw err;
      res.send('File upload to'+target_path+'-'+req.files.upload.size+'bytes');
    })
  })
})

module.exports = route;

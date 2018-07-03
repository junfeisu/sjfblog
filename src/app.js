// var express = require('express');
// var path = require('path');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var blog = require('./route/blog');
// var doc = require('./route/meta');
// var webhook = require('./route/deploy');
// var cons = require('consolidate');

import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookir-parser'
import bodyParser from 'body-parser'
import cons from 'consolidate'
import blogRoute from './route/blog'
import docRoute from './route/meta'
import webhookRoute from './route/deploy'

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/static/dist')))

app.use('/api/blog', blog);
app.use('/api/doc', doc);
app.use('/api/webhook', webhook);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(4000, function() {
  console.log('Server start at 127.0.0.1:4000');
})

module.exports = app;

import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cons from 'consolidate'
import mongoConnect from './model/mongodbUtil'
import blogRoute from './route/blog'
import docRoute from './route/meta'
import webhookRoute from './route/deploy'

const app = express()
mongoConnect()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '/src/static/dist')))

app.use('/api/blog', blogRoute)
app.use('/api/doc', docRoute)
app.use('/api/webhook', webhookRoute)

app.use(function(req, res, next):void {
  var err = new Error('Not Found')
  err['status'] = 404
  next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next):void {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next):void {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

if (!module.parent) {
  app.listen(4000, function() {
    console.log('Server start at 127.0.0.1:4000')
  })
}

export default app

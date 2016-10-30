---
title: slj之socket.io
tags: socket node
date: 2016-10-19
---
前俩天为了弥补自己的错误(让女票不高兴，删光了留言说说，不能恢复呀，她又叫我还她说说留言，所以就做了一个类似qq空间的实时SPA)，由此看到实时，大家就都想到了websocket，但是我用的是express + mongodb搭建的后端，所以就用了node的socket.io模块。

首先在项目中

    npm install socket.io --save

安装成功之后咱们再说一下socket的应用的使用原理,原理就是一开始建立一条保持通信的tcp链接，服务端和客户端可以一直保持通信，除非某一方自动中断链接。闲话不多说，直接看代码就知道怎么回事了。

    var io = require('socket.io')(server)

    io.on('connection', function (socket) {
      socket.on('addme', function () {
        console.log('addme')
      })
      socket.on('comment', function (comment) {
        console.log('comment')
        mongo.add(new model['Comment'](comment), function (err, res) {
          err ? io.emit('comment_error', err) : io.emit('comment_update', res)
        })
      })
      socket.on('topic', function (topic) {
        console.log('topic')
        mongo.add(new model['Topic'](topic), function (err, res) {
          err ? io.emit('topic_error', err) : io.emit('topic_update', res)
        })
      })
    })
其实socket通信就是服务端和客户端之间不停的相互emit事件,一开始我以为socket.on('xxx')是会自动在某个特定条件下会触发的,但是
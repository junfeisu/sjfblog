---
title: slj之socket.io
tags: socket node
date: 2016-10-19
---
前俩天为了弥补自己的错误，所以就做了一个类似qq空间的实时SPA，由此看到实时，大家就都想到了websocket，我用的是express + mongodb搭建的后端，所以就用了node的socket.io模块。

首先在项目中

    npm install socket.io --save

安装成功之后咱们再说一下socket的应用的使用原理,原理就是在客户端和服务端之间建立一条保持通信的tcp链接，服务端和客户端可以一直保持通信，除非某一方自动中断链接。闲话不多说，直接看代码就知道怎么回事了。
    
server.js(Express)

    // 创建一个本地服务器监听在3000端口
    var server = app.listen(3000, function () {
      console.log('server is listen port 3000')
    })
    
    // 引入socket.io并将需要建立socket连接的server传给它
    var io = require('socket.io')(server)
    
    // 当连接建立时， 自动获取socket对象
    io.on('connection', function (socket) {
      // 接收客户端传播的addme事件
      socket.on('addme', function () {
        console.log('addme')
      })

      // 接收客户端传播的comment事件
      socket.on('comment', function (comment) {
        console.log('comment')
        mongo.add(new model['Comment'](comment), function (err, res) {
          // 将数据库操作结果传播给客户端
          err ? io.emit('comment_error', err) : io.emit('comment_update', res)
        })
      })
    })

client.js

    <script src="/socket.io/socket.io.js"></script>
    // 引入socket.io并将需要建立连接的服务器的地址传入
    let socket = window.io('http://localhost:3000')
    
    // 建立连接之后就可以向服务器传播事件并且发送数据
    socket.on('connection', function () {
      socket.emit('addme', function () {
        console.log('addme')
      })
    })

    xxx.onclick = function () {
      socket.emit('comment', data)
    }

其实socket通信就是服务端和客户端之间不停的相互`传播`和`接收`事件,一开始我以为socket.on('xxx')是会自动在某个特定条件下会触发的,但是事实上是只有在广播了事件，然后在接收事件的时候才会执行，这样就形成了一次server和client之间的通信.


这样我们就可以通过这样不断的去传播和接收事件就达到了实时通信的效果，简单的效果可以访问[slj](http://slj.sujunfei.cn)。
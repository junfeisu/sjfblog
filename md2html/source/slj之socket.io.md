---
title: slj之socket.io
tags: socket node
date: 2016-10-19
---
前俩天为了弥补自己的错误(让女票不高兴，删光了留言说说，不能恢复呀，她又叫我还她说说留言，所以就做了一个类似qq空间的实时SPA)，由此看到实时，大家就都想到了websocket，但是我用的是express + mongodb搭建的后端，所以就用了node的socket.io模块。

首先在项目中

    npm install socket.io --save

安装成功之后咱们再说一下socket的应用的使用原理,原理就是一开始建立一条保持通信的tcp链接，服务端和客户端可以一直保持通信，除非某一方自动中断链接

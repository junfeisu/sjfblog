---
title: sjfblog之旅(webhook)
tags: webhook
date: 2016-10-19
---
### 什么是Webhook
用户通过自定义回调函数，然后在收到一定的通知后，自动执行这个回调来改变Web应用的一种方式，当然这个通知一般是由第三方应用进行管理的。用户通过指定一个URL，以及触发方式(事件)可以对其进行规定流程，从而达到当你执行对应的事件时第三方应用就会将这个事件通知给你指定的URL。

以`Github`提供的`Webhook`为例解释一下到底是怎么回事，`Github`的`Webhook`是基于每个`repository`而言的，当你指定对应的触发方式是`git push`的时候，当你向这个仓库进行push东西之后，`Github`就会向你指定的URL通知这次改动，指定的URL对应的应用收到通知后就会执行自定义回调，达到预期的目的整个过程，我理解为`Webhook`。

### 为什么用Webhook
`Webhook`可以用来实现持续集成，实现项目的自动安装依赖，编译静态文件，以及部署，就会避免每次的改动以及部署需要人工手动进行部署。

当然上面说的有点高大上，sjfblog这个项目中用到的`Webhook`一开始是准备用来进行自动拉取最新代码，然后进行依赖安装，在进行静态文件的编译，以及将最新的md文件进行解析从而更新数据库。但是由于本人的服务器目前配置太低，所以依赖安装，静态文件的编译就放在本地执行了。然后Github上sjfblog这个仓库的Webhook设置如下图![sjfblog-webhook设置图](http://7xrp7o.com1.z0.glb.clouddn.com/sjfblog-webhook.png)

那个`Payload URL`就是待通知的应用的地址，然后下面有一个`which events would you like to trigger this webhook`就是说`Webhook`的触发方式，下面咱们再看一下这个**Webhook通知**的具体内容。其实就是一个POST请求，post请求的数据就是这次commit的信息，这个信息包括改动的文件等等，详细可以看看下面的截图。![](http://7xrp7o.com1.z0.glb.clouddn.com/webhook-motice.png),然后咱们就可以通过这个请求获取到这些信息，然后进行对应的操作。
---
title: sjfblog之旅(页面优化)
tags: 页面优化
date: 2016-11-26
---

一篇本该昨天写完的博客却只能今天来写了，不说了，心痛呀(系统崩溃)。

以前经常听别人说或者在知乎等上面看到前端优化的文章或者话题， 
但是今天自己尝试了一次简单的页面优化，先上一张没有优化之前的加载图。

![](http://7xrp7o.com1.z0.glb.clouddn.com/time-more.png)

最长的那个首屏加载竟然达到了11秒之多，这还是在网络情况较好的情况下，这是极大多数人所不能容忍的，所以就会有了这次的经历。那么到底是哪些原因造成这么多的前端性能问题。

#### 网页分析工具
这个时候咱们就需要一个用于网页性能分析的工具咯，不然只能像无头苍蝇一样乱碰。在这里我想推荐的一款这类工具就是**PageSpeed Insights**,一款chrome插件，下载地址[PageSpeed](https://chrome.google.com/webstore/detail/pagespeed-insights-with-p/lanlbpjbalfkflkhegagflkgcfklnbnh?hl=en-US)，当然这是要去墙外才给下的咯，再给大家看一下它长啥样。

![](http://7xrp7o.com1.z0.glb.clouddn.com/page-speed.png)

下面是对页面分析完之后的样子(没优化之前只有50分)，**红灯**这个是最需要优化的地方(当然这里已经不存在了)，**绿灯**的就是需要优化的地方，灰灯就是不需要优化的地方。它点开之后会给出问题所在以及建议。反正对于我们这些菜鸡来说还是够用的。

![](http://7xrp7o.com1.z0.glb.clouddn.com/pageAnalized.png)

#### 优化措施
下面步入正题，我的优化到底做了哪些事。

+  减少首屏加载时间

    首先说一下首屏加载的问题，上面那个加载了11秒多的js文件大家可以看一下有多大（1M多），因为采用的是webpack打包的，而且没有做**模块按需加载**，所以最后打包出来的文件达到了1M多。那么问题就是减少首屏加载的文件体积，所以与首屏无关的模块应该让他不在首屏加载。

    因为我用的是vue-router,所以可以用vue-router进行模块的按需加载。那么首屏加载的文件就只有首屏需要展示的模块了，然后按需加载之后的首屏加载文件可以再看一下是多大。

    ![](http://7xrp7o.com1.z0.glb.clouddn.com/optimizeIndex.png)

    相比没有优化前的首屏加载的文件体积小的倍数是几十倍，所以加载时间也就大大缩小，当然还有因为别的措施的原因，但是这个自身加载体积呈几何倍数的缩减有不可分割的关系。

+ 减少HTTP请求次数

    这里就是大家老生常谈的优化措施了，虽然大家都耳熟能详，但是它确实是一个很有用的措施，所以就是加载的时候尽量合并请求并且压缩请求的体积。

      * 合并js,css文件然后进行压缩，这个大部分的脚手架工具(gulp, grunt, webpack等)都能完成，只要你写好配置文件

      * 小图标合并成一张雪碧图，多次请求合并成一次请求。

      * 尽量减少或者合并外联的HTTP请求

+ 后端开启Gzip服务

    因为我的服务器上用的是Nginx做的代理，所以可以通过配置nginx.conf文件来开启Gzip服务。linux下`nginx.conf`文件一般在`/etc/nginx`目录下，然后去编辑这个文件。打开会看到下面这样一段配置。

    ![](http://7xrp7o.com1.z0.glb.clouddn.com/nginx-gzip.png)

    `gzip on`就表明已经开启gzip服务了。

    `gzip_types`表示的是这台nginx服务器支持`gzip`服务的文件类型列表，就是说会对下面类型的文件进行`gzip`压缩。
    
    这里我还提前踩了一个坑，给大家提示一下就是`nginx`的`gzip_types`里面是**没有application/javascript**，他默认的是`text/javascript`,那么问题就有时候会出现在这里。

    它自身给`javaScript`文件贴上的`Request Headers`里面的`Content-type`却又是`application/javascript`，这不是坑爹吗？js文件不会开启Gzip服务呀。所以我们就需要把`gzip_types`里面的`text/javascript`改成`application/javascript`或者在里面增加一项`application/javascript`，看下面的示例图，`Content-Encoding: gzip`表示gzip服务成功开启了。

    ![](http://7xrp7o.com1.z0.glb.clouddn.com/nginx-response.png)

+ 静态资源放在静态服务器上然后开启融合CDN进行加速

    我这里用的是七牛云，所有的静态图片都是放在七牛云上面的，然后开启了融合CDN加速服务，然后还有别的必须的外联请求的话也可以采用第三方的免费CDN进行加速，国内的BootStrap的CDN速度还是可以的。

+ 利用缓存
  
    对于一些内容展示性的部分，并且改动的可能性比较小的话，咱们就可以将这些部分存在缓存里面，减少请求次数,例如在第一次请求了一篇博客的具体内容，可以把数据存在**sessionStorage**里面，这样在页面没有关闭的时候下次再点进这篇博客的时候就可以直接从本地缓存获取。不用再次去从服务器获取内容。

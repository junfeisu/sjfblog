---
title: sjfblog之旅(nginx)
tags: nginx
date: 2016-10-19
---
#### nginx绑定域名

nginx的配置都是在一个nginx.conf文件里面更改的，那么问题来了，这个文件在哪里？我们可以切换到根目录然后用`whereis`命令进行查找

``` bash
  cd /

  whereis nginx.conf
```
![](http://7xrp7o.com1.z0.glb.clouddn.com/whereis.png)

一般ubuntu是在/etc/nginx(这个是默认的)下面，你也可以自己编写一个nginx.conf然后在默认的nginx.conf里面`include`进去,下面看一下nginx.conf文件里面是啥样得

首先第一行`user`，一般默认是`www-data`,如果什么都没有的话，那就是nobody，这个配置项对应的就是nginx执行的用户权限，为了避免权限问题(我懒)，我将它改成了root，就是说里面的`nginx process`是以root用户去执行的，一般不会出现权限不够的问题。

在主要是看http里面的server配置，server 里面就是一个个项目的域名配置。

```bash
  server {
    listen 80;
    server_name xxxxx;
    location / {
      root /home/xxxxxx;
      index index.html;
      proxy_pass http://localhost:4000;
    }
  }
```
  * listen表示监听的端口, 上面表示监听80端口
  * `server\_name`表示务要绑定的域名
  * `root`表示静态资源的根目录
  * `index` 表示默认入口文件 可以是`index.html index.htm index.php`
  * `proxy\_pass`表示将访问80端口的请求代理到4000端口，因为后端服务开启在4000端口，直接监听4000端口也可以，只是访问的时候需要在`server\_name`后面加上4000端口，因为浏览器默认访问的端口号是80

这里就已经配好了一个简单的域名。当然写完nginx.conf配置之后检测一下nginx的配置有没有什么问题
    
    sudo nginx -t

看到这样的信息才说明你的nginx.conf没有简单的语法之类的错误

    nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
    nginx: configuration file /etc/nginx/nginx.conf test is successful

然后要重新启动nginx服务,俩种方式：

  1. sudo service nginx restart
  2. sudo /etc/init.d/nginx restart

重启的时候有时候会fail，你多重启几次试试，实在不行就断开链接重新进去再重启nginx，前提是你前面nginx -t过了
当然nginx.conf文件里面好友好多知识，你问我，我也不会，自己去学，我也是没办法才来了解了一点nginx知识
  
  * 比如里面还有服务器GZip服务的开放
  * worker\_progress表示工作进程的数量，数目设置成CPU的核数还是核数的倍数，还是自动计算auto
  * rewrite只在localtion,server里面配置有用，并且会忽略url后面的传递的参数

如有错误谢谢大家提出来
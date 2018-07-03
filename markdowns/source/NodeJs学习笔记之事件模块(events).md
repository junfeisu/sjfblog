---
title: NodeJs学习笔记之事件模块(events)源码分析
tags: Node EventEmitter
date: 2017-08-03
---
#### 作用
events模块是Node实现的几个核心模块之一，同时更是<strong style="background: yellow">实现异步编程</strong>的一个重要模块，几乎其他的包含异步操作的核心模块都会引用这个模块，如fs, net, domain, inspector这些核心模块。所以events模块就是用来<strong style="background: yellow">处理异步响应</strong>的模块，也可以说是Node事件驱动模式的一个Node API层支持。

#### 用法

首先看一下events模块有哪些API，详尽请看[NodeJs官方文档](https://nodejs.org/api/events.html#events_event_newlistener)，然后主要的API在下面的这张截图里面，也是从里面截出来的:

![Node events API](http://7xrp7o.com1.z0.glb.clouddn.com/node_eventsAPI.png)

<strong style="color: #4EBA0F">导入模块</strong>

    var EventEmitter = require('events')
    var emitter = new EventEmitter()

也可以这样

    var EventEmitter = require('events').EventEmitter
    var emitter = new EventEmitter()

其实我们需要导入的是一个构造函数EventEmitter,因为所有的方法和属性都是写在这个里面或者他的原型上。

至于上面的俩种写法咱们看一下[源码](https://github.com/nodejs/node/blob/master/lib/events.js)就什么都明了了

    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    module.exports = EventEmitter;

    // Backwards-compat with node 0.10.x
    EventEmitter.EventEmitter = EventEmitter;
注释里面清楚的说明了第二种的写法其实是v0.10.x时的写法，所以大家最好就写成第一种的形式，因为好多教程还有博客都比较老，写的还是第二种形式的，所以还是鼓励大家去看官方文档。

<strong style="color: #4EBA0F">API介绍</strong>

至于各个API的详细用法大家可以去看一下上面提供的[官方文档地址](https://nodejs.org/api/events.html#events_event_newlistener)里面去查阅，不过这里可以和大家介绍一下三个上面图中没有列出来<strong style="background: yellow">大家容易忽略</strong>的事件。<strong style="color: #4EBA0F">newListener 、removeListener、error</strong>

其实这三个都不是API，只是该模块在写的时候提供的三个内置的事件类型，分别对应的事件类型是

 1. 添加新的事件监听器(on,once,pretendListener,addListener)，
 2. 移除事件监听器(removeListener|removeAllListeners)
 3. 发生错误。

咱们可以给这三个类型添加监听事件，当触发上面的那些操作时，对应的监听函数就会执行，而且函数的参数就是触发的事件类型，和监听函数。当没有添加的时候就是啥都没有，大家相安无事。下面看一个例子就知道了
    
    var EventEmitter = require('events')
    var emitter = new EventEmitter()

    function sayHello() {
        console.log('hello')
    }

    function addNewListener (event, listener) {
        console.log(event + '\'s listener is', listener)
    }

    emitter.on('newListener', addNewListener)
    emitter.on('test', sayHello)

结果如下图：

![newListener示例结果图](http://7xrp7o.com1.z0.glb.clouddn.com/newListener.png)

<strong style="color: red">注意: 要想让newListener触发，一定要在test之前先给newListener事件注册监听函数，就是监听一定要发生在触发之前</strong>

我们看一下源码的实现就知道了

    if (events.newListener) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }

看到那个耀眼的if是不是就明白了一切。其他的俩个类似，但是error有些特殊，就是如果你没有手动给error事件添加监听函数，那么出现错误的时候就会直接抛出错误，程序也就中断了，所以为了代码健壮性，最好在程序里加一个错误处理。

#### 源码解析

咱们主要看三个部分，初始化、注册函数、发射函数(emit)的实现

<strong style="color: #1989fa">初始化</strong>

先看源码

    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    module.exports = EventEmitter;

    // Backwards-compat with node 0.10.x
    EventEmitter.EventEmitter = EventEmitter;

    EventEmitter.usingDomains = false;

    EventEmitter.prototype.domain = undefined;
    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._maxListeners = undefined;

    EventEmitter.init = function() {
      this.domain = null;
      if (EventEmitter.usingDomains) {
        // if there is an active domain, then attach to it.
        domain = domain || require('domain');
        if (domain.active && !(this instanceof domain.Domain)) {
          this.domain = domain.active;
        }
      }

      if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
      }

      this._maxListeners = this._maxListeners || undefined;
    };

首先声明了一个构造函数，并且在上面定义了俩个私有属性EventEmitter、usingDomains和一个私有方法init，就是说属于类(构造函数本身，实例不能访问和调用)，关于私有属性和私有方法可以看一下[这里](http://es6.ruanyifeng.com/#docs/class)

当我们调用构造函数创建实例时就是调用init方法。初始化函数里面主要干了三件事

 1. 绑定当前活动域domain(暂时还不清楚具体意义，等下次学习之后补一篇介绍)
 2. 创建events，也就是注册的事件的容器，注册的事件都塞这里面。
 3. 设定每个事件的最大监听器数量，这个是可以修改的setMaxListeners

<strong style="color: #1989fa">注册函数</strong>

这部分对应的实现主要是下面的_addListener方法

    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = target._events;
      if (!events) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
      } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener) {
          target.emit('newListener', type,
                      listener.listener ? listener.listener : listener);

          // Re-assign `events` because a newListener handler could have caused the
          // this._events to be assigned to a new object
          events = target._events;
        }
        existing = events[type];
      }

      if (!existing) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === 'function') {
          // Adding the second element, need to change to array.
          existing = events[type] =
            prepend ? [listener, existing] : [existing, listener];
        } else {
          // If we've already got an array, just append.
          if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
        }

        // Check for listener leak
        if (!existing.warned) {
          m = $getMaxListeners(target);
          if (m && m > 0 && existing.length > m) {
            existing.warned = true;
            const w = new Error('Possible EventEmitter memory leak detected. ' +
                                `${existing.length} ${String(type)} listeners ` +
                                'added. Use emitter.setMaxListeners() to ' +
                                'increase limit');
            w.name = 'MaxListenersExceededWarning';
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            process.emitWarning(w);
          }
        }
      }

      return target;
    }

首先说一下四个参数：
    
 1. target就是this的指向
 2. type就是注册的事件名称，如emitter.on('hello')，type就是hello
 3. 就是注册的事件的监听函数
 4. 布尔值，是否耍流氓，直接插入到这个事件类型的监听函数队列的队首，不是就默默站到队尾

然后主要干了三件事

 1. 如果注册了newListener，就emit
 2. 将事件注册进入到events里面
 3. 注册完毕检测该事件注册的监听器数量是否达到最大值，是就要给出警告

从上面函数可以推出一个实际的events的结构如下:

    events = {
        'type1': listener1,
        'type2': [listener2, listener3]
    }
注册的事件成为events的一个key，key对应的value就是这个事件注册的所有监听器，value分为俩种情况:

 * 当监听器只有一个的时候value就是孤零零的函数

 * 当监听器多于一个的时候就是一个监听器数组。

知道了events的结构，其实很多事情就已经比较明了了，removeListener和removeAllListeners的大概实现大家应该也都有思路了。

但是实际上比大家想象的要复杂那么一些。(<strong style="color: red">别忘了把removeListener上面说的这个事件考虑进去，假如用户注册了这个事件，删除一个监听器就要emit一次，直至events里面只有removeListener事件为止</strong>，所以就不能那么简单粗暴了)

<strong style="color: #1989fa">发射函数(emit)</strong>

这个函数的实现可以说是精华了，主要做了俩件事:

 1. 对error事件的详细处理
 2. 提取listeners并进行处理然后分别执行不同的函数

下面的部分是对error的处理，函数参数只有一个type（事件名称）

    var er, handler, len, args, i, events, domain;
    var needDomainExit = false;
    var doError = (type === 'error');

    events = this._events;
    if (events)
      doError = (doError && events.error == null);
    else if (!doError)
      return false;

    domain = this.domain;

    // If there is no 'error' event listener then throw.
    if (doError) {
      if (arguments.length > 1)
        er = arguments[1];
      if (domain) {
        if (!er)
          er = new Error('Unhandled "error" event');
        if (typeof er === 'object' && er !== null) {
          er.domainEmitter = this;
          er.domain = domain;
          er.domainThrown = false;
        }
        domain.emit('error', er);
      } else if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        const err = new Error('Unhandled "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
      return false;
    }

首先判断type是否是error，是的话继续判断是否注册过事件，没注册过就分当前domain为空和不为空，在看是否带了错误信息，错误信息的类型是否是Error，没有或者不是就自己给用户一个比较友好的错误提示，然后抛出错误

反正考虑的是十分详尽，考虑到了边边角角。

下面的部分是提取listener并封装进行不同处理的部分

    handler = events[type];

    if (!handler)
      return false;

    if (domain && this !== process) {
      domain.enter();
      needDomainExit = true;
    }

    var isFn = typeof handler === 'function';
    len = arguments.length;
    switch (len) {
      // fast cases
      case 1:
        emitNone(handler, isFn, this);
        break;
      case 2:
        emitOne(handler, isFn, this, arguments[1]);
        break;
      case 3:
        emitTwo(handler, isFn, this, arguments[1], arguments[2]);
        break;
      case 4:
        emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
        break;
      // slower
      default:
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        emitMany(handler, isFn, this, args);
    }

    if (needDomainExit)
      domain.exit();

判断listeners是一个还是多个，附带给监听函数的参数分为0，1，2，3，多个的情况。其实这样是因为说call和apply的区别在于，参数为0，1，2，3的时候call的性能要比apply好，当参数超过3个的时候apply的性能要好，当然暂时我也不知道为什么。关于domain的操作暂时不太明白，就不瞎扯了。

#### 总结

当然源码里面还有好多可以挖掘的东西，感兴趣的可以自己去挖掘，比如once的实现还是比较巧妙的。

有错误欢迎指正

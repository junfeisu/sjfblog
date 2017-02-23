---
title: bind与apply,call的区别
tags: this
date: 2017-01-06
---
今天电面的时候被问及this的问题，当然而然也就引出了apply, call和bind.虽然知道点，但是因为bind这个被人家个怼死了，问了个apply,call和bind的最大区别。

好吧，先简单说下this，this就是函数内部执行的上下文(context),具体的this指向这些问题可以看我的另一篇博客[关于this的感悟](http://blog.sujunfei.cn/#!/detail/582c733bde473702ed011a75)

举个栗子：

    var obj = {
      name: 'sjf',
      sayName: function () {
        console.log(this.name)
      }
    }

    var name = 'window'
    var test = obj.sayName
    obj.sayName() // 'sjf'
    test() // 相信大家都知道这时应该是'window'
![](http://7xrp7o.com1.z0.glb.clouddn.com/this.png)

相信大家也清楚了在一般没有改变this的情况下，this总是指向那个函数的直接触发者。

然后当你想改变这个this的指向的时候，apply，call，bind这三个货就出现了，也就是改变函数的执行上下文。

首先介绍apply和call，其实apply和call并没有什么区别，只是这俩个函数传递参数的方式不一样罢了
  
  * apply第一个参数就是你要指定的上下文(必须的)，第二个参数是一个数组(可选)，里面是本来要传给原函数的参数

  * call第一个参数就是你要指定的上下文(必须的)，后面的参数(可选)就是本来要传给原函数的参数

下面举俩个栗子
    
  * 只传上下文

        var test = {
          name: 'test'
        }

        var obj = {
          name: 'sjf',
          sayName: function () {
            console.log(this.name)
          }
        }

        obj.sayName() // -->'sjf'

        // 将obj.sayName方法的执行上下文指向test
        obj.sayName.call(test) // -->'test'
        obj.sayName.apply(test) // -->'test'
  
  * 原函数(这里是forEach)需要传参数

        var str = 'this is a string'

        Array.prototype.forEach.call(str, value => {
          console.log(value)
        })

        Array.prototype.forEach.apply(str, [value => {
          console.log(value)
        }])

下面再看看 **bind** 与 **apply, call** 有什么区别，先看下比较专业的解释(MDN)上面的解释
![](http://7xrp7o.com1.z0.glb.clouddn.com/MDN-bind.png)

我的理解就是bind会重新创建一个函数，函数体的内容和原函数一样，默认把这个函数的上下文指向原函数的上下文，否则这个函数的上下文就是你传入进来的上下文，然后这个传入的上下文还是不可重写的。具体的实现可以去MDN上看[bind的polyfill的实现](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)就会更加清楚这个创建一个新函数是怎么回事。具体使用方法:

    var obj = {
     name: 'obj'
    }

    var sayName = function () {
      console.log(this.name)
    }

    var name = '123'
    sayName.bind(obj)() // -->'obj'

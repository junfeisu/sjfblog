---
title: 关于this的一点感悟
tags: this
date: 2016-11-16
---
在各个编程语言中this都是一个令人头疼的问题，因为this的指向情况实在有点复杂，尤其是在js这种类编程语言中。在js中刚开始不熟的时候都会以为俩种情况。
  
  1. this指向自身
  
  2. this指向函数的作用域

第一种是不对的，比如看一下后面的代码：

    test.count = 2
    function test () {
      this.count = 3 // 指向自身的话这里的this就指向test
    }
    
    test()
    console.log(test.count)
![](http://7xrp7o.com1.z0.glb.clouddn.com/test.png)
但是结果还是2,说明test里面的this并未指向test

第二种首先简单说一下什么是作用域，作用域就是函数的可访问区域（变量），而且作用域是嵌套的。

    function test () {
      var a = 2
      console.log(this.a)
    }
    test() // --> undefined
如果`this`指向当前作用域的话，输出的应该是2，而不是`undefined`。

既然上面的说法都不对，那么this到底指向什么，我自己通过js大红书《JavaScript高级程序设计》和《你不知道的JavaScript上卷》俩本书中对这部分的介绍总结了一下就是。

  **this指向触发含有this操作的函数的<span style="color: red">最初对象自身</span>(不包括`call`和`apply`这俩种情况)**

当然这样说肯定都没理解是什么意思，因为我也不好总结，还是用代码说话最直接。

    var a = 'window'
    function test () {
      console.log(this.a)
    }
    test() // 相当于window.test()

    function test1 () {
      console.log(this.a)
    }
    var obj = {
      a: 'obj',
      foo: test1
    }
    obj.foo() // --> 'obj'
  * 最初触发`test`函数的对象就是`window`,这个时候`test`里面的`this`指向`window`对象，所以结果就是输出'window'
  * 最初触发`test1`函数的对象是`obj`,这个时候`test1`里面的`this`指向`obj`对象，所以结果就是'obj'


当然如果**函数体**使用的是严格模式而不是**调用位置**的话,`this`不会指向`window`对象, eg:

      var a = 'window'
      function test () {
        'use strict'
        console.log(this.a)
      }
      test() 
![](http://7xrp7o.com1.z0.glb.clouddn.com/unpoint_window.png)
上面的严格模式强调使用的地方是**函数体**，在具体一下：


当然上面的俩个例子是最普通的情况，下面咱们再看一下其他几种特殊的情况

  * 与`this`操作相关的别名函数

        var obj = {
          a: 'obj',
          foo: function () {
            console.log(this.a)
          }
        }

        var a = 'window'
        var bar = obj.foo
        bar() // --> 'window'  
// 最初触发obj.foo函数的是bar()函数，而调用bar的就是window对象

  * 参数为与`this`操作相关的函数

        function test () {
          console.log(this.a)
        }

        var obj = {
          a: 'obj',
          foo: test
        }

        var a = 'window'

        function executeFn (fn) {
          fn()
        }

        executeFn(obj.foo) // --> 'window'
        // 最初触发test函数的就是executeFn函数，而调用它的又是window对象，所以结果还是'window'

然后就是call和apply的情况就是强制将this绑定到call和apply的对象上面。

谢谢大家的浏览，如有错误欢迎大家指正。
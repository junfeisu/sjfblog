---
title: js上下文
tags: Context
date: 2017-07-01
---
## js执行上下文

js执行上下文的三个重要部分就是： **变量对象**，**作用域链**，**this指向**

#### 变量对象(Varible Object)

变量对象就是这个上下文中可以访问的所有变量构成的集合，不同上下文环境对应的变量对象是不一样的。

全部变量对象就是全局环境下的变量对象，浏览器环境下的就是Window对象。

对函数上下文来说：
变量对象的形成过程分为三个阶段： 创建函数阶段，进行执行上下文阶段，执行代码阶段

    function test(a) {
        var b = 1
        function c() {}
        var d = function() {}
    }

    test(1)
函数创建阶段，也就是初始化变量对象阶段：
这时变量对象里面只有Arguments对象。
 
    VO = {
        arguments: {
            0: 1,
            length: 1
        }
    }

然后是进入函数上下文，也就是编译函数体的时候：

这时变量对象会依次加入：
形参及其键值对、函数声明的键值对、变量声明的键值对

    VO = {
        arguments: {
            0: 1,
            length: 1
        },
        a: undefined,
        b: undefined,
        c: reference to function() {},
        d: undefined
    }

最后是执行函数阶段：对变量对象的各个属性值进行更新
也是按照形参、函数声明、变量声明的顺序

    VO = {
        arguments: {
            0: 1,
            length: 1
        },
        a: 1,
        b: 1,
        c: reference to function c() {},
        d: reference to FunctionExpression function() {}
    }

最后这里还要申明的就是，在处理的过程中遇到同名的怎么处理

具体的规则就是在上下文中，一般的顺序就是按照上面的顺序来查找，遇到同名了，从形参开始找，找不到，再从形参找。但是这有一个例外，那就是函数声明，函数声明是在进入上下文阶段就已经赋好值了，所以在形参和变量还是声明，没有初始化的状态就已经覆好值，并且值是不可更改的。
    
    function test(a) {
        console.log(a)
        function a() {}
        console.log(a)
    }

    test(1) 
    -->  function a() {}
    -->  function a() {}

    function test(a) {
        console.log(a)
        var a = function () {}
        console.log(a)
    }

    test(1)
    -->  1
    -->  function () {}

    function test(a) {
        console.log(a)
        var a = 3
        console.log(a)
    }

    test(1)
    -->  1
    -->  3

### 作用域链
作用域链就是当前上下文的变量对象，加上父上下文的变量对象，这样一直向上到全局上下文的变量对象(全局对象)这些变量对象构成的就是作用域链。
    
    function parent() {
        function child() {}
    }

parent的作用域链就是**parentContext.VO --> globalContext.VO**

child的作用域链就是**childContext.VO -->  parentContext.VO -->  globalContext.VO**

函数的作用域是在函数创建时就已经决定了的，函数内部有一个属性[[scope]]，当函数创建的时候就会将父上下文的作用域链保存到[[scope]]对象中。也就是
    
    function test() {}
    
    // 函数创建时
    test.[[scope]] = [
        globalContext.VO
    ]

    // 函数执行时，创建执行上下文testContext
    test.[[scope]] = [
        testContext.VO,
        globalContext.VO
    ]

    // 最终test函数的作用域链就是上面显示的那样。

### this指向

这个可以看看我的这篇文章[关于this的一点感悟](http://blog.sujunfei.cn/#!/detail/582c733bde473702ed011a75)或者[JavaScript深入之从ECMAScript规范解读this](https://github.com/mqyqingfeng/Blog/issues/7)，这篇从一个不同的角度：一个不存在的类型Reference，但是感觉经常碰到的类型来进行讲解的。

### 执行上下文栈

这个就是存放上下文的地方，众所周知，js是单线程的，反映到这里就是说js引擎一直执行这个执行上下文栈顶的上下文。那么这个栈里到底存放了哪些东西呢？

    var a = '123'
    console.log(a)

上面一段代码很简单就是定义了一个变量并给了一个初值，然后再打印这个变量。那么js引擎是如何运行的呢。这里没有定义函数什么的，那它的上下文是什么呢？还记得上面说的全局执行上下文吗？对，这时执行上下文栈里面存放的就是全局上下文。下面再看一下，这段代码：

    var globalScope = 'global'

    function first() {
        var fisrtScope = 'first'
        console.log(fisrtScope)
    }

    function second() {
        var secondScope = 'second'
        console.oog(secondScope)
    }

    first()
    second()
    console.log(globalScope)

首先一开始，js引擎开始进行解析执行，当执行到***first()之前***，这时执行上下文栈里面的执行环境都是***globalContext***

    ECStack = [globalContext]

当开始执行*first()*的时候，这个时候会***创建firstContext***，然后push进栈，

    ECStack = [globalContext, firstContext]

这个时候js引擎就会执行在firstContext上面，当***first执行完毕，firstContext弹出栈并销毁(存在于对应代码执行阶段)***
    
    ECStack = [globalContext]

。然后继续执行second(),***创建secondContext***，push进栈。

    ECStack = [globalContext, secondContext]

这时js引擎就执行在secondContext上面。当**执行完毕后，secondContext弹出栈并销毁**。

    ECStack = [globalContext]

然后继续执行，执行在全局上下文中。**注意**，这时候并没有将全局上下文push进栈，因为全局上下文从一开始进栈之后就**没有出过栈**。

#### 闭包

在js中，闭包是一个神奇的东西，引用一段IBM博客里面的一句话：**闭包是由函数和与其相关的引用环境组合而成的实体**。

这里为什么要再把闭包在这里提起呢，是因为上面说了一般的函数在执行完毕就会把函数的执行上下文弹出栈并且立即销毁。但是闭包就是一个例外了。

    function test() {
        var a = 1
        return fucntion() {
            console.log(a)
        }
    }

    var fn = test()
    fn()

就像上面的示例，当代码执行完毕`var fn = test()`这一句后，test()执行完毕，它返回了一个匿名函数，并且这个匿名函数还要访问test上下文的变量对象里面的a，那如果在test()执行完毕就销毁test的上下文，那么在执行fn()时，就会抛出错误**ReferenceError: a is not defined**。但是我们使用闭包的本意不是这样，需要的就是能够访问到这个a。

对于这个一般有俩种说法：

 1. 当test执行完毕，test的执行上下文被销毁。但是返回的匿名函数仍然可以通过作用域链访问到a，也就是说testContext.VO没有被销毁。

 2. 当test执行完毕，test的执行上下文没有立即销毁，而是在闭包返回的函数或者当作参数传入执行完才会销毁。

个人比较支持第二种说法，因为本文的思想就是VO(变量对象)就是绑定在上下文上面的，而作用域又是建立在VO的基础上的。当然无论是哪种思路，能够理解闭包或者看的懂代码就行，至于到底是怎样的，欢迎大家去研究更底层的。

#### 小结

* js引擎一直执行在ECStack栈顶的上下文里面，全局上下文一直存放在ECStack里面。

* 闭包的作用就是延长作用域链，但是这个作用域链对当前上下文又是不可见的。

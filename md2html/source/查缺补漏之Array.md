---
title: 查缺补漏之Array.from
tags: Array
date: 2016-11-27
---

####Array.from
  Array.from()方法用于将**类数组对象**或者**可遍历对象**

  更确切的说是**具有length属性和若干索引属性的对象**或者**可以迭代的对象**(MDN上面的解释)。eg:

    var str = 'test'
    Array.from(str) ==> ['t', 'e', 's', 't']

    var body = document.querySelectorAll('body')
    Array.from(body).forEach(value => {
      console.log(value)   ==> <body>...</body>
    })

  Array.from()还可接受一个参数mapFn,顾名思义就是类似map()方法的处理函数。就是对转换出来的Array在进行一次处理。eg:
        
    Array.from({lenght: 3}, (value, index) => value + index)  ==>  [NaN, NaN, NaN]
    // 这里顺带说一下
    0 + undefined = NaN // because Number(undefined) === NaN
    0 + null = 0 // because Number(null) === 0
  如果有兴趣的话，可以自己看下Array.from到底是怎么实现的，MDN上面有[Array.from](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)实现方法。只能说一句话，写的是滴水不漏，大写的佩服。下面和大家一起来看一下，详细完整代码自己可以去刚刚上面贴的地址里面自己去看。

    
  最外层是用一个**IIFE函数**返回一个函数赋给Array.from，没什么可说的。

  然后下面的一个判断是否是一个函数的函数isCallable()

    var toStr = Object.prototype.toString
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]'
    }
  其实**typeof**判断一个函数是否是function就可以了，我也不知道为什么还要用**Object.prototype.toString**这个方法再判断一次，我觉得用这俩个方法的其中一个都可以，了解的请解答一下，非常感激。

  下面是一个取整的函数toInteger()。
  

    
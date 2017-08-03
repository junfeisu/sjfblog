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

    var number = Number(value)
    if (isNaN(number)) {return 0}
    if (number === 0 || !isFinite(number)) {
      return number
    }
    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
  不得不说确实考虑的很周全，首先用Number()函数进行强制类型转换，然后判断转换后的是否是非法的数字，如果是的话直接返回0(数组长度)，然后再是0或者不是无穷大(正无穷和负无穷)和NAN的话直接返回,不是的才向下取整。下图是MDN上对isFinite()的说明。

  ![](http://7xrp7o.com1.z0.glb.clouddn.com/isFinite.png)

  这个最核心的部分还是下面的内容

    return function from(arrayLike) {
      var C = this
      var items = Object(arrayLike)

      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined")
      }
      // 判断是否提供了第二个参数，也就是对生成的数组进行处理的Map处理函数
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined
      var T
      if (typeof mapFn !== 'undefined') {
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function')
        }

        if (arguments.length > 2) {
          T = arguments[2]
        }
      }

      var len = toLength(items.length)
      // 判断C是否是一个函数，其实我认为就是判断其是否是Array这个内置的构造函数
      var A = isCallable(C) ? Object(new C(len)) : new Array(len)

      var k = 0
      var kValue
      while (k < len) {
        kValue = items[k]
        // 如果提供了对生成数组的Map处理函数就执行Map处理函数
        if (mapFn) {
          // 判断是否提供this的指向，不需要使用默认指向，否则强制改变this指向
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k)
        } else {
          A[k] = kValue
        }
        k += 1
      }
      A.length = len
      return A
    }
生成数组的核心模块就是这一部分![](http://7xrp7o.com1.z0.glb.clouddn.com/generateArray.png)

从把类数组的值一个个添加到对应的位置，然后把数组的长度设置为len 

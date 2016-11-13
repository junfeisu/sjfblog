---
title: setTimeout和IIFE的联用
tags: setTimeout IIFE
date: 2016-08-29
---
##### 首先上三个类似的代码片段，大家去判断一下结果是什么样的

    // this is the first code segment
    for (var i = 0; i <= 5; i++) {
      setTimeout((function timer() {
        console.log(i)
      })(), i*1000)
    }
    console.log(i)

    // this is the second code segment
    for (var i = 0; i <= 5; i++) {
      (function(){
        setTimeout(function() {
          console.log(i)
        }, i*1000)
      })()
    }
    console.log(i)

    // this is the thrid code segment
    for (var i = 0; i <= 5; i++) {
      setTimeout(function() {
        console.log(i)
      }, i*1000)
    }
    console.log(i)
##### 是不是有部分小伙伴觉得答案有点怪异，和自己想的有点不一样，其实都是障眼法，我们都被骗了。结果应该是 0 1 2 3 4 5 6， 6 6 6 6 6 6 6， 6 6 6 6 6 6 6，而且都是以每秒打印一个数字，当然for循环外面那个console和前面的间隔我们就当做一秒吧，如果还是弄不清的话，可以在for循环外面的console里面加一点修饰信息，例如

    // this is the first code segment
    for (var i = 0; i <= 5; i++) {
      setTimeout((function timer() {
        console.log(i)
      })(), i*1000)
    }
    console.log('this is global i ' + i)

    // this is the second code segment
    for (var i = 0; i <= 5; i++) {
      (function(){
        setTimeout(function() {
          console.log(i)
        }, i*1000)
      })()
    }
    console.log('this is global i ' + i)

    // this is the thrid code segment
    for (var i = 0; i <= 5; i++) {
      setTimeout(function() {
        console.log(i)
      }, i*1000)
    }
    console.log('this is global i ' + i)
##### 再去打印一下结果，结果又有点不一样，变成0 1 2 3 4 5 this is..., this is ... 6 6 6 6 6 6, this is ... 6 6 6 6 6 6。这下结果又更加清晰了
##### 首先看一下第一段代码，在一个for循环中定义了一个setTimeout定时函数，定时函数的第一个参数是一个IIFE(立即执行函数),就是定义完就会执行，虽然是作为定时函数的回调函数，但是还是和其他IIFE一样，定义完就执行，for循环执行一次，i加一次就console一次这个立即函数就执行一次。最后的i是6就不用说了(循环结束条件)
##### 接着看第二段代码，for循环里面定义了一个IIFE,IIFE里面是一个定时函数，这时就要说说定时函数的特性，定时函数在引擎执行阶段是放在队列的最后，所以他是最后执行的，虽然被定义在IIFE里面，但是还是逃脱不了这个命运，所以setTimeout的回调是在for循环结束之后才执行的，所以一开始出现的是for循环外面的那个console，for循环执行完之后就成为了6，并且是全局变量。
#### 第三段代码和第二段是一样的，只是比第二层还少了一层忽悠而已

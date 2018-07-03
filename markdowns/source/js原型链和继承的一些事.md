---
title: js原型链和继承的一些事
tags: prototype inherit
date: 2016-08-30
---
## js原型链
##### 首先简单说一下原型，js中替代其他面向对象语言中的类的一种特殊结构，原型是基于对象而言的，一个对象被创建时，js内部就会为这个对象添加一个\_\_proto\_\_属性，这个属性指向的就是这个对象的原型对象，Object()对象内置的公有属性方法就是添加在内置的Object对象的原型对象上面的。例如toString(), hasOwnProperty()等等，可以去浏览器控制台自己打印一下看看，结果是这样的。
![](http://7xrp7o.com1.z0.glb.clouddn.com/prototype.png)
##### 然后这个原型对象又有自己的prototype属性，指向他的原型对象，就这样一直向上指，直到没有原型为止，也就是原型链的顶端（Object.prototype）,他的prototype指向的是null,这样由prototype指向形成的链就是原型链,可以分为俩种吧,一种就是构造函数的prototype指向的函数, 一种就是普通的对象的prototype指向的对象,当然可以把函数也看做对象吧(个人觉得js里面就一种数据类型,就是对象)
## prototype 和 \_\_proto\_\_
##### prototype属性是函数对象才有的属性，一般的对象事没有prototype对象的，有的只是\_\_proto\_\_属性，实际上，\_\_proto\_\_属性才是真正的原型属性指针，但是这个属性是不被浏览器所公开的，只是能看，并不能在开发中使用，所以这时prototype就出现了（但是只在函数对象中使用），这时看一下浏览器显示的结果吧。
![](http://7xrp7o.com1.z0.glb.clouddn.com/prototype%20and%20__proto__.png)
## 继承
#### 1. 原型继承(封装之后的Object.create()方法)
##### 简单说一下实现方法
        var parent = {
          name: 'sjf'
        }
        var child = inherit(parent)
        // 实现继承的方法
        function inherit (obj) {
          var F = function () {} //创建一个临时构造函数
          F.prototype = obj //把构造函数的原型指向你要继承的对象
          return new F() //返回这个构造函数的实例
        }
        // child从parent那里继承了name属性
        console.log(child.name) // --> 'sjf'
##### 当然如果你的父对象如果是由一个构造函数创建的,那么就还可以继承父对象原型上面的属性和方法,例如
        function Parent () {
          this.name = 'sjf'
        }
        Parent.prototype.sayName = function () {
          console.log(this.name)
        }
        var parent = new Parent()
        var child = inherit(parent)
        function inherit (obj) {
          var F = function () {}
          F.prototype = obj
          return new F()
        }
        // 这里child既继承了parent的属性name,还继承了parent原型上的getName方法
        child.sayName() //--> 'sjf'
##### 下面再来做一个思考,如果把inherit函数里面的F.prototypr = obj 改成F.prototype = obj.prototype 那么刚才的结果又是什么呢?
        child.sayName() //--> undefined
        // 说明child继承了parent原型上面的sayName方法,但是并没有继承parent的name属性
##### 下面用一幅图来解释一下上面的三段代码的结果(字好丑)
![](http://7xrp7o.com1.z0.glb.clouddn.com/IMG_20160831_095854.jpg)
#### 2. 类式继承
1.  默认模式

    和上面的原型继承模式一样的,没什么区别

2.  借用构造函数

        function Parent () {
          this.children = ['sjf', 'jjj']
        }
        var parent = new Parent()
        function Child () {}
        Child.prototype = Parent
        var child = new Child()
        function Nephew () {
          Parent.call(this) // 把parent这个对象的自有属性复制了一遍
        }
        var nephew = new Nephew()
        // child是引用parent上面的属性,而child本身并没有这个属性
        console.log(child.hasOwnProperty('chidren')) //-->false
        // nephew是实实在在的拷贝了一份parent对象上面的属性,所以nephew本身就具有这个属性
        console.log(nephew.hasOwnProperty('children')) //-->true

    这种方法Parent.call()或者apply()只能复制这个Parent对象上的this属性和方法,不能继承原型上的属性和方法,但是好处是你改变nephew上面的属性方法不会改变Parent上面的属性方法,因为它是拷贝了一份Parent this上面的属性方法的副本,而不是引用Parent this上面的属性方法

3.  借用和设置原型

    这种模式就是在上面的借用构造函数函数模式改变一点就可以了,就是如果再上面的模式中的Nephew的定义后面加上一句Nephew.prototype = parent(也就是new Parent()),那么nephew就在拷贝了一份副本之后还可以对Parent this上面的属性方法和Parent.prototype上面的属性方法进行引用,但是如果访问属性的话,还是从自身的属性开始查询,如果没有,再去沿着原型链一层一层的往上查询,直到找到为止,如果没有找到,就会返回undefined,可以按照代码顺序一步一步的去画上面那样的结构图,就会一目了然

        function Parent () {
          this.children = ['sjf', 'jjj']
        }
        Parent.prototype.sayChildren = function () {
          console.log(this.children)
        }
        var parent = new Parent()

        function Child () {}
        Child.prototype = Parent
        var child = new Child()
        function Nephew () {
          Parent.call(this) // 把parent这个对象的自有属性复制了一遍
        }
        Nephew.prototype = parent
        var nephew = new Nephew()

        console.log(child.hasOwnProperty('chidren')) //-->false
        // 继承了Parent.prototype上面的sayChildren方法
        console.log(nephew.sayChildren()) //-->['sjf', 'jjj']

    当然缺点也就是Parent上面的属性会被继承俩次,当然有得就有失,如果只是想继承Parent.prototype上面的属性方法的话,我们就可以把Nephew.prototype指向Parent.prototype,这样就会避免Parent上面的属性方法会被继承俩次
    
4.  共享原型

    共享原型就是父对象的实例和子对象实例同时指向父对象的原型对象,就是共享Parent.prototype上面的属性方法

    缺点就是子对象不能访问父对象自身的属性方法以及一个子对象改变了原型上的东西,将会影响所有的父对象




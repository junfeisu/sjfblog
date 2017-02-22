---
title: position和float详解
tags: position float
date: 2017-02-22
---
> ### position的四大常用属性介绍
  
  1. ##### 定义及特性:
  
    * **static**: 这个是position属性的默认值，就是元素遵从普通文档流的位置布局

    * **relative**: 俗称相对定位，是说相对于该元素在**普通文档流中默认的位置进行移动，并没有脱离普通文档流**

    * **absolute**: 俗称绝对定位，相对于**该元素的最近的一个非static定位的祖先元素的位置**进行定位，**可以设置外边距margin，并且不会发生坍塌**，设置绝对定位的元素会脱离普通文档流，在普通文档流里面不会占据空间

    * **fixed**: 相对于**浏览器屏幕视窗定位，不会随着屏幕的滚动而改变位置**，会脱离普通文档流，在普通文档流不占据空间

  2. ##### 造成的影响以及一些具体特点：

    * 对display属性的影响：
          1. **display**: relative**不会改变**元素的display属性，但是**fixed和absolute会改变**元素的display属性，**行内元素**的display会被改成block属性，当然如果**行内元素**的display属性设置了**block，inline-block， table**等值的话，就**不会改变元素的display属性**，这里插播一句float也会改变display属性，和absolute差不多，具体测试的话可以自己通过**widnow.getComputedStyle()**这个API来得到计算后的各个属性的值

          2. **z-index**: 在IE6/7中，z-index属性会失效

    * 基于盒模型（margin, border, paddind, content）的基础解释定位起点：

        absolute: 上面说的是相对该元素的最近的一个非static定位的祖先元素的位置，那么这个位置具体指什么呢？包括该元素的margin? border? padding? 还是什么样的呢？下面看一下代码的演示实例

            .parent {
              margin: 10px;
              padding: 10px;
              border: 5px solid blue;
              background: red;
              height: 100px;
              position: relative
            }

            .child {
              position: absolute;
              left: 0;
              width: 200px;
              height: 20px;
              background: yellow;
            }

            <div class="parent">
              <div class="child"></div>
            </div>

        ![relative的定位起点](http://7xrp7o.com1.z0.glb.clouddn.com/absolute.png)
        从图中可以看出absolute定位的起点就是**那个最近的非static的祖先元素的盒模型当中的padding + content的左上角**，**不包括该元素的margin， border**

> ### float
  
  1. ##### float的定义：是一个元素脱离普通文档流，导致父元素获取不到他的高度，然后被安放在容器的左边或者右边，其他的行内元素和文本围绕这个元素，一开始float就是被用来让文本环绕图片的，而不是用来进行定位布局的

  2. float改变display属性，这点和上面的absolute一样，可以去看上面的

  3. float浮动相对父元素的位置开始浮动是怎么样的？

        .parent {
          margin: 10px;
          padding: 10px;
          border: 5px solid blue;
          background: red;
          height: 100px;
        }

        .child {
          float: left;
          width: 200px;
          height: 20px;
          background: yellow;
        }

        <div class="parent">
          <div class="child"></div>
        </div>

    结果是这样![](http://7xrp7o.com1.z0.glb.clouddn.com/relative.png),从这张图可以看出float相对父元素浮动时是相对父元素的content进行浮动的，也就是说不包括margin, border, padding
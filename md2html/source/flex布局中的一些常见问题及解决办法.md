---
title: flex布局中的一些常见问题及解决办法
tags: flex
date: 2017-04-25
---
### 父元素 flex 布局，并且高度固定，子元素的高度自适应的情景
首先看一个例子
  
    .parent {
      display: flex;
      width: 200px;
      height: 300px;
      background: red;
    }

    .child {
      background: blue;
    }
    <div class="parent">
      <div class="child">child</div>
    </div>

示例效果如图![](http://7xrp7o.com1.z0.glb.clouddn.com/flex-parent-child.png)

那么为什么会出现这种情况，这个是因为<strong style="color: #f7b32b"> align-items </strong>的默认值是<strong style="color: #f7b32b"> strench </strong>，默认所有子元素的高度占满父元素的高度。

既然已经知道了这个问题根源所在就好办了，我们把 parent 的 align-items 属性的值设置为一个你需要的，像 flex-start 就是默认在父元素内部的头部显示。

但是这时候又有一个需求出现了，我们不是需要所有子元素的高度都是自适应而是部分子元素的高度要自适应，部分撑满FU父元素。那么我们此时再单独只靠父元素设置 align-items 是不能解决问题了。我们可以父元素的 align-items 就使用默认值 strench ，然后那些需要高度自适应的子元素单独设置，怎么设置呢？ 这个时候就是 align-self 登场了，给这些子元素设置 align-self: flex-start;也就是说 flex 不仅可以通过父元素设置每个子元素的高度的设置法则，也可以单独设置每个子元素的高度法则。看个例子。

    .parent {
      display: flex;
      width: 200px;
      height: 300px;
      background: red;
    }

    .child1 {
      background: blue;
    }

    .child2 {
      background: yellow;
      align-self: flex-start;
    }
    <div class="parent">
      <div class="child1">child1</div>
      <div class="child2">child2</div>
    </div>


效果如下： ![](http://7xrp7o.com1.z0.glb.clouddn.com/flex-align-self.png)

### 父元素宽度固定子元素的宽度问题

在实际开发中我们经常遇到那种类似的俩栏布局或者三栏布局的问题，就像传统的圣杯布局，双飞翼布局等等，但是这里咱们不用传统的那些方法去解决，咱们用flex布局来实现看看怎么弄。咱们先事先说一下几个相关的属性：
  
  * **flex-grow**

    **flex-grow** 定义每个子元素的放大比例，默认为0,也就是说该子元素的大小就是自身大小，不会占据父元素多余的空间，值为1的话就会占据剩下的空间，如果几个子元素都是1,那么这几个子元素就会均分剩余空间，如果一个是2,其它是1,那么2的这个占据的剩余空间是其他子元素的俩倍。

  * **flex-shrink**

    **flex-shrink** 定义每个子元素的缩小比例，默认为1,就是当空间不足时，每个子元素等比缩小，假如一个子元素的值为0,其他为1，当空间不足时，该元素不会缩小，其他的会等比缩小空间。

  * **flex-basis**
    
    **flex-basis** 
      定义每个子元素占据主轴的空间，默认值为 auto 浏览器就是根据这个是否还剩下剩余空间，从而进行分配或者压缩。

      flex-basis 占据的主轴空间具体看 flex-diretion 的值是什么，如果 flex-direction 的值是默认值也就是 row 的时候我们的 flex-basis 是指占据横向空间的值，如果 flex-direction 的值为 column 的时候 flex-basis 也就是指占据纵向空间的值。

      当然这个还可以设置为一个具体的值比如400px，那么在计算剩余空间的时候这一项占据的主轴空间就是400px。
      
      当 flex-direction 为默认值时，width 和 flex-direction 都为 auto 的时候计算主轴空间就看内容，内容占据多少就是占据多少主轴空间。当 flex-auto 和 auto 有一个为具体值的时候，他占据的主轴空间就按这个值来计算。当 width 和 flex-basis 同时设置了的话 width 的值会被 flex-basis 的值覆盖。

      1. width 和 flex-basis 有一个为具体值:
            
            .parent {
              display: flex;
              width: 200px;
              height: 200px;
            }
            
            .child1 {
              flex-grow: 0;
              flex-basis: auto;
              background: red;
            }

            .child2 {
              flex-grow: 1;
              flex-basis: 0;
              background: yellow;
            }

            .child3 {
              flex-grow: 1;
              flex-basis: auto;
              background: green;
            }

            <div class="parent">
              <div class="child1">child1</div>
              <div class="child2">child2</div>
              <div class="child3">child3</div>
            </div>
        效果如图： ![](http://7xrp7o.com1.z0.glb.clouddn.com/basis-width-any.png)

        说明一下：三个 child 的默认值均为40, 图中 child1 的 width 是40, child2 的 width 是60, child3 的 width 是100。剩余空间 = 200 - 40 - 0 - 40 = 120，因为 child1 的 flex-grow 为0,所以不会分配剩余空间，width 就为40， child2 和 child3 的 flex-grow 都为1，所以 child1 和 child2 会均分剩余空间在加上他们的 flex-basis 的值之后就是最终的 width 60 和 100。

      2. width 和 flex-basis 都设置了的时候：

            .parent {
              display: flex;
              width: 200px;
              height: 200px;
            }
            
            .child1 {
              flex-grow: 0;
              flex-basis: auto;
              background: red;
            }

            .child2 {
              flex-grow: 1;
              flex-basis: 0;
              width: 30px;
              background: yellow;
            }

            .child3 {
              flex-grow: 1;
              flex-basis: auto;
              background: green;
            }

            <div class="parent">
              <div class="child1">child1</div>
              <div class="child2">child2</div>
              <div class="child3">child3</div>
            </div>

        效果如图：![](http://7xrp7o.com1.z0.glb.clouddn.com/basis-width-any.png)

        和上面的一样，因为设置的 width 的值被 flex-basis 的值覆盖了。

      最后申明一下，这个项目最后的实际宽度不是由单个的 width 或者 flex-basis 能够决定的，是由这些属性一起综合决定的。

这三个属性。这三个属性可以合为一个属性 flex (默认值: 0 1 auto);分别对应上面三个属性 flex-grow、flex-shrink、flex-basis，后面俩个属性的值可以不写。

所以了解上面三个属性的特性的时候，咱们就知道了具体去对待一个情景的时候，怎么设置对应每个子元素的这些属性。

---
title: RegExp之-g全局模式
tags: RegExp
date: 2016-11-14
---

正则表达式之-g模式的简单了解，为什么会突然想起这个问题呢？还要缘由从US项目说起，因为需求其中一列要显示成这样
![list](http://7xrp7o.com1.z0.glb.clouddn.com/check.png),像图中显示那样，每个部门的分数如果有小数位最后保留俩位小数，如果是整数就直接显示整数。但是后端返回的数据是这样的
  
    var departments = [{
      department: "办公室",
      score: 38.714749999999995
    }, {
        department: "应维",
        score: 39.492000000000004
    }, {
        department: "开发",
        score: 39
    }, {
        department: "设计",
        score: 39
    }, {
        department: "运营",
        score: 39.195
    }]
所以我就想写一条正则语句来对这些数据进行过滤，正则表达式如下：
    
    var re = /\d+\.\d+/g
这条正则想干的就是匹配那些具有小数点的数值。结果如下：
![result](http://7xrp7o.com1.z0.glb.clouddn.com/reg_result.png)
但是问题的重点不在这里，我就用上面的正则语句去匹配了`departments`里面的每项的`score`。代码如下：
    
    var re = /\d+\.\d+/g
    departments.forEach(value => {
      if (re.test(value.score)) {
        console.log(value.score)
      }
    })
结果如下图，只输出了`38.714749999999995`，`39.195`俩个数，为什么输出没有第二项里面的score,按理说，这三项是都能被正则表达式所匹配的，但是事实上就是没有匹配到，一开始我还以为是js浮点数的bug，去查资料，发现并没有这方面的问题。这个时候老司机(黄康德)出现了，老司机就是老司机，老司机说去看看是不是正则的bug，这时候才想起去找正则表达式的锅，到了后面慢慢发现是-g模式的问题
![g_result](http://7xrp7o.com1.z0.glb.clouddn.com/reg_g_result.png)
这时候咱们看一下-g模式到底是怎么运行的，g表示global，表示全局匹配，就是匹配所有符合规则的字串。普通模式是匹配到第一个符合的就停止匹配，全局模式是匹配到第一个符合的字串之后，继续匹配一直匹配到最后一个字符为止。那么他是怎么进行的呢?看一下下面的代码。

    var str = 'macmscm'
    var re = /m/g
    for (var i = 0; i < 6; i++) {
      console.log(re.test(str))
      console.log(re.lastIndex)
    }
![](http://7xrp7o.com1.z0.glb.clouddn.com/theory.png)
上面的lastIndex是上次匹配的字串的index(位置)，下次匹配从这里开始进行匹配。

所以我们就开始知道了全局模式的匹配是怎么回事，理一下思路，一开始`re.lastIndex = 0`,也就是从待匹配的字符串的第一个字符开始匹配符合规则的字串，匹配到之后就把lastIndex更改到匹配到的字串的最后一个字符的位置，准备进行下一次的匹配，一直匹配到最后一个符合匹配的字串，这时再进行下一次匹配，已经没有符合的字串了，这时`lastIndex`又回到了0。这个时候相信大家应该和我一样对全局模式有了一个简单的了解了，有错的地方欢迎指出。
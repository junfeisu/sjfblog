---
title: mongdb aggregate(聚合函数)
tags: mongodb aggregate
date: 2016-07-26:14:20
---
# mongoodb aggregate方法详解
### $project()
#####  这个方法就是对要输出的每个document里面的字段进行自定义,可以定义要显示的字段,可以对字段进行重命名,进行重命名,甚至一个字段拆分为多个字段,但是不会改变数据库里面的document结构
    MySchema = {
        title: 'slj',
        content: 'slj forever',
        author: 'sjf',
        tags: ['Love'],
        time: '2016-7-25'
    }
    Model.aggregate([{$project: {content: 1}}])
##### 下面的的结果清楚显示只包含了content这一字段(ObjectId是mongodb的特点,你懂得)就是说在$project里面你写了什么字段输出结果就只包含这个字段加上ObjectId,content后面的属性只要不是0或者false这些进行判断值会为false或者会被隐式转换为false的值就可以。所以要去除ObjectId就加一条_id: 0就可以了
    > db.tests.aggregate([{$project: {content: 1}}])
    {
    "result" : [
            {
                "_id" : ObjectId("579756e87f2f69c657ef2ec8"),
                "content" : "slj forever"
            }
        ],
        "ok" : 1
    }
##### 下面的结果显示怎么进行拆分字段($substr顾名思义大家都知道就是取字串,然后取字串怎么用大家都知道,拆分也就是通过这个取字串来的)
    > db.tests.aggregate([{$project:{time:{year:{$substr:["$time",0,4]},month: {$substr: ["$time",5,6]}}}}])
    {
        "result" : [
            {
                "_id" : ObjectId("579756e87f2f69c657ef2ec8"),
                "time" : {
                    "year" : "2016",
                    "month" : "7-25"
                }
            }
        ],
        "ok" : 1
    }
##### 还有一些那些功能可以自己去试一下
![](https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSY8jdWVr4oPZYAz_nRM_YrullSUCuOz7fae3vZE67WlTGOacxcsg)
### $group()
##### 这个方法就是按照给定表达式组合结果 ,比如说你想根据某个字段对信息进行分类
    > db.tests.aggregate({$group: {_id: "$tags"}})
    {
        "result" : [
            {
                "_id" : [
                    "Love",
                    "Baby"
                ]
            },
            {
                "_id" : [
                    "honey"
                ]
            }
        ],
        "ok" : 1
    }
#####首先那个通过查找的属性名一定要是_id,就是唯一标识符,然后后面的可以直接写$加分组的字段名,当然也可以进行重命名,如:
     db.tests.aggregate({$group: {_id: {rename: "$tags"}}})
            "_id" : {
                "rename" : [
                    "Love",
                    "Baby"
                ]
            }
##### 但是$group不适合大数量的数据进行分组,因为是在内存中进行的
### $sort()
##### 大家一看就知道这 个管道函数使用来进行排序的,确实如此,而且规则也和js差不多,-1表示降序,1表示升序
#####  + $sort和其他管道函数一起用的时候最好放在前面,只会对后面管道函数选出的内容进行排序
#####  + $sort()也是在内存中进行的,所以当需要排序的内容达到物理内存的10%就会报错
##### + 当多个属性进行排序冲突时,按照最先进行排序的属性进行排序 
    * db.tests.aggregate({$sort: {content: -1,time: -1}})这俩个时冲突的就会按照content进行降序排序
    * db.tests.aggregate({$sort: {time: -1,content: -1}})就会按照time进行降序排序
### $unwind()
##### 这个函数就是对对应的属性进行拆分然后插入到document,就是说如果对上面的tags:["Love","Baby"]进行unwind就会发生这个document会被拆分成俩个docuemnt,一个包含tags: "Love",一个包含"Baby",其他字段的内容都是一样的,eg: 
    > db.blogs.aggregate({$project:{tags: 1}},{$unwind: "$tags"})
    {
        "result" : [
            {
                "_id" : ObjectId("579601837bd410473d2d064d"),
                "tags" : "Love"
            },
            {
                "_id" : ObjectId("5796019b7bd410473d2d064e"),
                "tags" : "Love"
            },
            {
                "_id" : ObjectId("5796019b7bd410473d2d064e"),
                "tags" : "Honey"
            }
        ],
        "ok" : 1
    }
### $skip()
##### $skip()就是跳过的意思,就是当我们对数据进行选择的时候可以从当前位置忽略一定数量的document ,$skip()的参数只能为正整数
    db.tests.aggregate({$skip : 5})
### $match()
##### $macth()管道函数其实和find()方法没什么区别,里面的匹配条件和find()的查找条件是一样的写法
    db.tests.aggregate({$match: {time: {$gte: 2016-7-01}}})
### $limit()
##### $limit()就是限制要查询的文档数量
    db.tests.aggregate({$limit: 5})
##### 从tests这个collections开始忽略五个document
### $skip()和$limit()的执行顺序问题
#### 首先看下俩个执行后的结果,$limit在$skip前面
    > db.tests.aggregate({$limit: 3},{$skip: 3},{$match: {order: {$gte: 4}}})
    { "result" : [ ], "ok" : 1 }
##### $limit()在$skip()的后面
    > db.tests.aggregate({$skip: 3},{$limit: 3},{$match: {order: {$gte: 4}}})
    {
        "result" : [
            {
                "_id" : ObjectId("5798a05d2d634aa2878ce7e4"),
                "order" : 4,
                "time" : "7-4"
            },
            {
                "_id" : ObjectId("5798a0622d634aa2878ce7e5"),
                "order" : 5,
                "time" : "7-5"
            },
            {
                "_id" : ObjectId("5798a0692d634aa2878ce7e6"),
                "order" : 6,
                "time" : "7-6"
            }
        ],
        "ok" : 1
    }
##### 通过上面的结果我们可以自己总结一下,$limit() 可以这样理解,$limit()限制的就是可以提供给后面的管道函数操作的document数目,就是说如果$limit:4也就是说执行了$limit()函数之后后面的管道函数能够操作的就是这4个document.
##### 在这个基础上我们再来看$limit和$skip的执行顺序问题,$limit()和$skip()在一起.无论如何,$limit()都会在$skip()的前面执行,如果$limit()就在$skip()前面的话,按照上面的理解就很容易理解第一个执行的result =[];$limit()在$skip()后面的话,会被提前到$skip()前面执行,但是:
**$skip的参数会被加到$limit上面,这一个机制就导致了上面俩个操作的不同的结果,所以第二个操作实际执行的是{$limit; 6},{$skip: 3},这样就简洁明了了**


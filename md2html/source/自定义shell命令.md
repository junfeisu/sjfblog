---
title: 自定义shell命令
tags: shell
date: 2016-09-24
---

##### 因为自己搭建了一个博客，而想要的效果就是和hexo一样，一键命令生成.md文件，然后自动生成标题和时间，以及tags，然后提交到远程自动pull生成博客，所以就有了这篇博客的出现。那么先贴出shell脚本代码再来解释
		#!/bin/bash

		path=~/Desktop/sjfblog/md2html/source
		current=$0
		time=`date '+%Y-%m-%d'`
		echo "the path is $path"
		cd $path
		echo "change dir to $path"
		if [ $# -ge 1 ]
		then
		    for f in $*
		    do  
		        touch $f.md
		        echo -e "---\ntitle: \ntags: \ndate: $time\n---\n" >> $f.md
		        echo 'The $f.md is creared at ~/Desktop/sjfblog/md2html/source'
		        subl $f.md
		    done
		else
		    echo "parm error,need file1[,file2...]"
		fi
		#echo "change dir to $current"
		cd ~
##### 第一个#!/bin/bash 是用来指定在当前系统下用什么解释器来执行这个脚本
##### 前面的path、current和time就是定义了三个变量（后面需要使用的），echo在shell里面就像js里面的console.log()一样，就是一个输出打印语句
##### 然后就是cd $path这个就是切换到path定义的目录，执行之后打印信息表示已经切换到指定目录
1.  $$表示当前shell进程的进程ID

2.  $#表示传递给脚本或者函数的参数的个数，$*表示传递给脚本或者函数的参数

3.  -ge表示大于等于，-gt表示大于等等

##### touch $f.md表示touch表示生成一个新文件，这里的$f就是for循环里面的变量
1.  echo -e 表示处理特殊符号(转义),也就是\b, \n, \d等等， >>表示把cmd命令的输出重定向到指定的文件(如果文件存在也就是继续把输出的内容加在后面)

2.  echo -n 表示不会换行输出
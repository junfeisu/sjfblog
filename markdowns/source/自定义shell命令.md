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
		        echo -e "```\ntitle: \ntags: \ndate: $time\n```\n" >> $f.md
		        echo 'The $f.md is creared at ~/Desktop/sjfblog/md2html/source'
		        subl $f.md
		    done
		else
		    echo "parm error,need file1[,file2...]"
		fi
		#echo "change dir to $current"
		cd ~
第一个#!/bin/bash 是用来指定在当前系统下用什么解释器来执行这个脚本
前面的path、current和time就是定义了三个变量（后面需要使用的），echo在shell里面就像js里面的console.log()一样，就是一个输出打印语句
然后就是cd $path这个就是切换到path定义的目录，执行之后打印信息表示已经切换到指定目录

1.  $$表示当前shell进程的进程ID

2.  $#表示传递给脚本或者函数的参数的个数，$*表示传递给脚本或者函数的参数

3.  -ge表示大于等于，-gt表示大于等等、

touch $f.md表示touch表示生成一个新文件，这里的$f就是for循环里面的变量

1.  echo -e 表示处理特殊符号(转义),也就是\b, \n, \d等等， >>表示把cmd命令的输出重定向到指定的文件(如果文件存在也就是继续把输出的内容加在后面)

2.  echo -n 表示不会换行输出
	
		subl $f.md

这个就是说生成$f.md文件之后用sublime编辑器打开进行编辑，当然这个凭个人喜好（换成自己常用的）,到了这里自定义命令的shell脚本已经写完了，然后还要讲解俩个文件

1. ~/.bashrc(bash配置文件)

2. myalias(别名文件)

首先更改一下.bashrc文件里面的内容(需要权限)

	sudo subl ~/.bashrc

在.bashrc文件的最后加上这段内容
	
	if [ -d "$HOME/mycmd" ]; then
    PATH=$PATH:~/mycmd
	fi

	if [ -f "$HOME/mycmd/myalias" ]; then
	    . ~/mycmd/myalias
	fi
第一个if语句是说你的自定义命令的文件的安放位置，bash要知道去哪里找这些文件，我这里是创建了一个mycmd文件夹
第二个if语句是说这个文件夹里面有没有一个叫myalias的文件,也就是说bash要知道你的自定义命令叫什么并且这个自定义命令所对应要执行的shell脚本。所以myalias文件里面的内容就是下面这样的

	alias sjf=". sjf.h"
	#echo "sjf.sh 和 myalias在同一目录"
	alias xxx=". xxx.sh"

上面的alias 就是制定自定义命令的名字，后面的.表示执行后面的shell脚本最后写好了这些文件之后

	cd ~
回到用户目录，执行一下这个命令
	
	source .bashrc
让bash加入sjf这个命令，来来大家可以试一试了.
---
title: Git简介及Git常见操作
tags: Git
date: 2018-01-27
---
### 来源
Linus在写Linux的时候本来使用的是一家叫做BitKeeper的收费版本控制系统，但是又一次写Linux内核开发组里面的一个人写了一个程序直接连接Bitkeeper的存储库(这样就可以免费使用)，但是被这个BitKeeper的人逆向找出来了，后面就取消了对Linux内核开发项目组的免费使用权，Linus去和他们协商不成，所以就开始准备自己写一个版本控制库，取名git(英国俚语：混蛋)

#### Git的作用区间层次
| 工作区 | --> |暂存区| --> |本地仓库| --> |远程仓库|
| ----  | ---- | ---- | ---- | ---- | ---- | ---- |
| 编辑器 | --> |git add| --> |git commit| --> |git push|

#### Git HEAD和head，ref这些概念的理解

 * HEAD是一个指针，指向当前工作的分支，也就是其中一个head  ref: refs/heads/branchName(这里面暂时不涉及detached branch)

 * head就是当前项目的git数据库里面的每个分支的root节点, 有一个head就是HEAD

 * ref也是一个指针，这个指针是为了方便区分和记忆各个head，因为各个head实际上指向的是一个个SHA1指示的commit_id(详情可以查看.git/refs/里面的内容)

所以这三个之间的关系如下 **ref指向了每个head代表的commit_id，然后head就指向了这些ref，然后HEAD就指向其中一个head**（HEAD--->head--->ref--->commit_id）

详细信息可以自己去一个git管理的项目里面的.git目录里面查看，主要可以看一下图中指出的文件和目录

![](http://7xrp7o.com1.z0.glb.clouddn.com/WechatIMG1.jpeg)

详细内容可以参考[Git References](https://git-scm.com/book/zh/v1/Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86-Git-References)

#### Git的常用命令

git add

|     git add .    |     git add -u    | git add -A(--all)
|      ------      |       ------      | ------ 
| 只添加改动得和新文件 |  只提交被记录过的文件 | 所有的都会提交

当你想撤销`git add`的时候怎么弄

git reset

    这个命令会把你刚才提交到暂存区的文件又放回工作区

    也可以指定撤销具体某个文件，后面加上这个文件相对项目根目录的路径就行，eg:

    git reset src/index.js

git commit --amend 

    当你的提交记录描述语言写的不对的时候用来修改的,不过这会创建一个新的记录

git push --force

    强制提交 当远程分支比你本地的分支提前的时候

| git pull | git pull --rebase |
| -------- | ------- |
| git fetch + git merge | git fetch + git rebase |

git pull 

    默认情况：会拉取所有remote的所有分支，并且本地没有的会自动创建分支

    特殊情况：拉取指定的分支，取决于.git/config文件里面的一个参数fetch，如下图所示

![](http://7xrp7o.com1.z0.glb.clouddn.com/WechatIMG2.jpeg)

    当fetch指定的是origin/\*的时候拉去的是远程所有分支，否则就是指定分支

**当你checkout的时候会和remote对应的分支自动创建track关系，但是git branch是看不到的，要加--all参数**

如何看track关系，可以去看.git/config里面的branch就会描述每个分支的track关系(上图中的master就和origin/master建立track关系)，没有的就说明没有track

如何建立track关系   

    git push -u | git branch set-upstream-to=origin/分支名  本地分支名

git branch -D

    删除分支

git branch branchName
    
    创建一个新分支但不会切换到这个分支

怎么恢复删除的分支

    git reflog 或者 git log -g找到被删除的分支的最后一个commit_id

    个人比较推荐git reflog因为这样很清晰不需要你记得最后一个提交的commit信息
    一般就是git reflog显示的第二个commit_id    因为你要删除分支的话必须要切换到其他的分支

    git branch 分支名 commit_id，执行完就看到分支又回来了，并且提交记录还在

    git reflog是一个比较好的记录你的git活动记录的工具，大家可以详细的看一下他的用法

git checkout -b test origin/master或者是具体某个commit_id

    创建一个新分支和你指定的那个commit_id或者分支保持一致

**注意这个origin/master只是本地拉取下来的最新的那个commit，不是和远程库的保持一致**

git clone --depth=1 test

    clone最新的一次commit记录，并且项目目录命名为test(一般默认为远程仓库的名字)

    后面假如想再把所有的记录都拉下来就要加 --unshallow参数   git pull --unshallow

git diff  用来比较文件或者commit之间的差异

    git diff 查看工作区的文件的改动（没有git add）
    git diff filename
    git diff branch 查看俩个分支最新的提交记录之间的差异
    git diff --cached 查看git add的文件和上次commit的之间的区别
    git diff commit_id1 commit_id2 查看俩条提交记录之间的区别

git rm

    git rm 会删除追踪的文件git记录，同时从硬盘删除文件(一般不使用)

    git rm --cached 会删除暂存区和本地仓库中的git记录，但是不会删除文件

git checkout
    
    <!-- 创建一个新的分支 -->
    git checkout -b <==>  git branch branchName + git checkout branchName 创建新分支并切换到这个新分支
    
    <!-- 切换分支 -->
    git checkout branch  <===> change HEAD（我们手动修改HEAD的指向也可以实现分支的切换）
    
    <!-- 切换文件 -->
    git checkout commit_id file 会舍弃工作区的修改，将文件替换成指定commit_id版本的file (不推荐使用)

git stash [Git Stash](https://git-scm.com/book/zh/v1/Git-%E5%B7%A5%E5%85%B7-%E5%82%A8%E8%97%8F%EF%BC%88Stashing%EF%BC%89)

    储藏临时修改，当你写到一半的时候需要切换分支的时候使用，
    
    但是有个缺陷就是如果有新建的文件，没有被git记录过，这个是不能被储藏的
    
    所以最好先git add，不要commit，然后再stash，这样就能把所有的更改完全收藏，不会带到你要工作的分支

    当切换分支回来继续开发的时候，直接git stash pop|git stash apply@{0}就可以了，然后你就可以看到刚才git add的所有修改

| git stash pop | git stash apply@{index} |
| ---------| ---------- |
| stash栈就不保留这条记录 | stash栈会保留这条记录 |

git merge(用于合并来个分支)

 git合并分支分为两种情况：
    
    *  两分支的公共祖先是要两个分支其中之一的时候

            c1——c2——c3 master
                     \
                      c4 feature

            1.feature合并入master的时候，就是直接把master指向c4，这个操作也称作Fast Forward(快进)

            2.master合并入feature的时候，不做任何操作，控制台会出现Alerady update的提示

    *  两分支的公共祖先不是要被合入的分支的时候

            c1——c2——c3——c4 master
                     \
                      c5——c6 feature

            这个合并是根据三个节点共同决定的，首先找到两个分支的最近公共节点，结合两个分支节点进行代码合并。这个合并会生成一个新节点，最后合并入的分支就指向这个新节点。

     --squash 合并分支的时候把要合并的分支的所有提交合并成一个提交，需要再commit一下

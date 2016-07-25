!/bin/bash

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
        hexo new $f
        echo -e "---\ntitle: \ntags: \ndate: $time\n---\n" >> $f.md
        echo 'The $f.md is creared at ~/Desktop/sjfblog/md2html/source'
    done
else
    echo "parm error,need file1[,file2...]"
fi
#echo "change dir to $current"
cd ~
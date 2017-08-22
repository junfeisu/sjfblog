var express = require('express')
var route = express.Router()
var deal = require('../model/blogOperate')
var exec = require('child_process').exec

var judge = {
  // 对博客的操作
  blog: function (result) {
    var mdReg = /^md2html\/source\//
    result.forEach(value => {
      if (mdReg.test(value.path)) {
        deal[value.tag + 'Blog'](value.path)
      }
    })
  }
}

var searchIndex = function(searchObj, path) {
  let addIndex = -1
  let updateIndex = -1
  let result = {}

  searchObj.forEach((val, index) => {
    if (val.path === value) {
      if (val.tag === 'add') {
        addIndex = index
      } else if (val.tag === 'update') {
        update = index
      }
    }
  })

  if (addIndex !== -1) {
    result.add = addIndex
  }
  if (updateIndex !== -1) {
    result.update = updateIndex
  }

  return Object.keys(result).length ? null : result
}

route.post('/', function (req, res) {
  exec('git pull --rebase origin master', {'cwd': '/home/www/sjfblog'}, function (err, stdout, stderr) {
    if (err) {
      res.status(500).json('err is ' + JSON.stringify(err))
    } else {
      var commits = req.body.commits
      var result = []

      commits.forEach(commit => {
        commit.added.forEach(value => {
          result.push({tag: 'add', path: value})
        })
        commit.modified.forEach(value => {
          result.push({tag: 'update', path: value})
        })
        commit.removed.forEach(value => {
          let sameFileIndex = searchIndex(result, value)

          if (sameFileIndex) {
            /* 
             * 当添加并同时修改该文件之后又删除该文件，那么这些操作就都不执行
             * 当添加该文件之后又删除该文件，那么取消对这个文件的操作
             * 当修改了一个文件之后又删除该文件，那么修改的操作可以去掉
             */
            if (sameFileIndex.add && sameFileIndex.update) {
              result.splice(sameFileIndex.update, 1)
              result.splice(sameFileIndex.add, 1)
            } else if (sameFileIndex.add && !sameFileIndex.update) {
              result.splice(sameFileIndex.add, 1)
            } else {
              result.splice(sameFileIndex.update)
              result.push({tag: 'remove', path: value})
            }
          } else {
            result.push({tag: 'remove', path: value})
          }
        })
      })

      judge.blog(result)
    }
  })
})

module.exports = route

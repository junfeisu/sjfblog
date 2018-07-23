import * as express from 'express'
import blogUtils from '../model/blogUtils'
import { exec } from 'child_process'

interface searchResult {
  add: number,
  update: number
}

const route = express.Router() 

const judgeBlog = (result: Array<Object>): void => {
  var mdReg = /^markdowns/
  result.forEach(value => {
    if (mdReg.test(value['path'])) {
      blogUtils[value['tag'] + 'Blog'](value['path'])
    }
  })
}

var searchIndex = function(searchObj, path) {
  let addIndex = -1
  let updateIndex = -1
  let result: searchResult = {
    add: 0,
    update: 0
  }

  searchObj.forEach((val, index) => {
    if (val.path === path) {
      if (val.tag === 'add') {
        addIndex = index
      } else if (val.tag === 'update') {
        updateIndex = index
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
      var result: Object[] = []

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

      judgeBlog(result)
    }
  })
})

export default route

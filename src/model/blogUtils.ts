import marked from 'marked'
import blogModel from '../model/schema'
import fs from 'fs'

interface blogInfo {
  tags: string[],
  title: string,
  create_date: string,
  content: string
}

const addLog = (err, data) => {
  var fileName = new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
  fs.open(`./blogLog/${fileName}.log`, 'a', err, function (e, fd) {
    if (e) {
      console.log(e)
    }
    fs.write(fd, data + '\n', function (error) {
      err ? console.log('write error is ' + error) : console.log('add log success')
    })
    fs.closeSync(fd)
  })
}

var blogUtils = {
  addBlog: function (value) {
    var mes: blogInfo = blogUtils.getContent(value)
    new blogModel(mes).save(function (err, blog) {
      err ? addLog('add ' + mes.title + ' error is ' + JSON.stringify(err), null) : 
        addLog(null, 'add blog ' + mes.title + ' is ' + JSON.stringify(blog.n))
    })
  },
  getContent: function (value) {
    var result = fs.readFileSync('/home/www/sjfblog/' + value, 'utf-8')
    var reg = /^---\n(.+\n){3}---\n/g
    var blogMes = {
      tags: [],
      title: '',
      create_date: '',
      content: ''
    }
    var headerInfo: Array<string> | null = result.match(reg)
    
    result = result.replace(reg, '')
    if (headerInfo && headerInfo.length) {
      var info: string = headerInfo[0].replace(/---|\n/g, '')
      // 去除换行符
      var re = /^title: |tags: |date: /g
      // change the (title: 123tag: 2434 fsdfsdate: 2016-09-25) to (,123,2434 fsdfs,2016-09-25)
      // split the (,123,2434 fsdfs,2016-09-25) to ['', '123', '2434 fsdfs', '2016-09-25']
      headerInfo = info.replace(re, ",").split(',')
      blogMes.title = headerInfo[1]
      blogMes.create_date = headerInfo[3]
      let tags: string[] = headerInfo[2].split(/\s/)
      blogMes.tags.push(tags)
      blogMes.content = marked(result)
    }
    return blogMes
  },
  removeBlog: function (value) {
    var blogTitle = value.replace(/.+source\/(.+)\.md/, (match, title) => {
      return title
    })
    blogModel.remove({title: blogTitle}, (err, blog) => {
        err ? addLog('remove ' + blogTitle + ' err is ' + JSON.stringify(err), null) : 
          addLog(null, 'remove ' + blogTitle + ' is ' + JSON.stringify(blog.n))
    })
  },
  updateBlog: function (value) {
    var mes: blogInfo = blogUtils.getContent(value)
    blogModel.update({title: mes.title}, {$set: {content: mes.content}}, 
      function (err, blog) {
        err ? addLog('update ' + mes.title + ' err is ' + JSON.stringify(err), null) : 
          addLog(null, 'update' + mes.title + ' num is ' + JSON.stringify(blog.nModified))
    })
  }
}

export default blogUtils

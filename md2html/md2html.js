var markdown = require('../node_modules/markdown').markdown,
	util=require('util'),
  fs = require('fs');


exports.md2html = function(content) {
  // var date = new Date(),
  // 	today=date.getFullYear() + '-' + (date.getMonth() + 1) ;
  //   fs.mkdir(today);
  //   fs.open('./' + today + '/' + title + '.md', 'w', 0644, function(e, fd) {
  //     if (e)
  //       throw e;
  //     fs.write(fd, content, function(e) {
  //       if (e)
  //         throw e;
  //       fs.closeSync(fd)
  //     })
  //   })
 	return markdown.toHTML(content);
}

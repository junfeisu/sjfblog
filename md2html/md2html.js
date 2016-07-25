var mongo = require('../model/mongo.js').mongoUse
var markdown = require('../node_modules/markdown').markdown
var model = require('../model/schema').models
var fs = require('fs')
// var blog = new model['Blog']({
//   title: title,
//   content: blogContent,
//   tags:
// })

var content = fs.readFileSync('./source/jjj.md', 'utf8');
var slice = content.split('---');
var message = slice[1].replace(/\n/g, '');
var title = (message.split('title: ')[1]).split('tags: ')[0];
var tags = (message.split('title: ')[1]).split('tags: ')[1].split('date: ')[0];
var date_create = message.split('title: ')[1].split('tags: ')[1].split('date: ')[1];
var blogContent = markdown.toHTML(slice[2]);

tags.split(' ').forEach(function(value) {
	console.log(value)
})
// mongo.add()
console.log(title)
console.log(date_create)

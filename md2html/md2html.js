var mongo = require('../model/mongo.js').mongoUse
var markdown = require('../node_modules/markdown').markdown
var model = require('../model/schema').models
var fs = require('fs')
// var blog = new model['Blog']({
//   title: title,
//   content: blogContent,
//   tags:
// })

var content = fs.readFileSync('./source/苏俊飞.md', 'utf8');
var a = content.split('---')[1].replace(/\n/g, '');
var slice = content.split('---');
var message = slice[1].replace('/\n/g', '');
var title = message.split('titles: ')[1].split('tags: ')[0];
var tags = message.split('titles: ')[1].split('tags: ')[1];
var blogContent = markdown.toHTML(slice[2]);

// mongo.add()

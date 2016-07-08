var markdown=require('./static/node_modules/markdown').markdown,
	fs=require('fs');

var content=fs.readFileSync('./test.md', 'utf8');

var abc=markdown.toHTML(content);

console.log(abc)

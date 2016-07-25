var mongo = require('../model/mongo.js').mongoUse
var markdown = require('../node_modules/markdown').markdown
var model = require('../model/schema').models
var util = require('util')
var fs = require('fs')

var content = fs.readFileSync('./2016-7/test.md', 'utf8');


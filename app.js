var server=require('./server'),
		route=require('./route/route'),
		global.controller=require('./controller');

server.start(route);
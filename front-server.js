var webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");

config.entry.app.unshift("webpack-dev-server/client?http://localhost:9000"); // 将执替换js内联进去
config.entry.app.unshift("webpack/hot/only-dev-server");
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
	contentBase: './src/',
  hot: true,
  historyApiFallback: false,
  status: {
    colors: true
  },
  proxy: {
    "*": "http://localhost:9999"
  },
});
server.listen(9000)

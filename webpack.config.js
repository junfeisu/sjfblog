const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DevServer = require('webpack-dev-server');

module.exports = {
  entry: {
    common: ['jquery', 'angular'],
    app: [
      path.resolve(__dirname, './src/main.js')
    ]
  },
  resolve: {
    extentions: ['', '.js', '.scss']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'build/',
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      exclude: 'node_modules'
    }, {
      test: /\.js$/,
      loader: 'eslint',
      exclude: 'node_modules'
    }, {
      test: /\.(png|jp?eg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: '[path]/[name].[ext]'
      },
      exclude: 'node_modules'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader',
      exclude: 'node_modules'
    }, {
      test: /\.html$/,
      loader: 'html',
      exclude: 'node_modules'
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: 'node_modules'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}

'use strict';
var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var autoprefixer = require('autoprefixer-core');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = function makeWebpackConfig(options) {
  var BUILD = !!options.BUILD;
  var TEST = !!options.TEST;
  var config = {};
  /**
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  if (TEST) {
    config.entry = {}
  } else {
    config.entry = {
      app: './src/main.js'
    }
  }
  /**
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  if (TEST) {
    config.output = {}
  } else {
    config.output = {
      path: __dirname + '/build',
      publicPath: BUILD ? '/' : 'http://localhost:8080/',
      filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',
      chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js'
    }
  }
  if (TEST) {
    config.devtool = 'inline-source-map';
  } else if (BUILD) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval';
  }
  config.module = {
    preLoaders: [],
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader!sass-loader'
    }, {
      test: /\.js$/,
      loader: 'babel?optional=runtime',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    }, {
      test: /\.html$/,
      loader: 'raw'
    }]
  };
  // ISPARTA LOADER
  // Instrument JS files with Isparta for subsequent code coverage reporting
  // Skips node_modules and files that end with .test.js
  if (TEST) {
    config.module.preLoaders.push({
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /\.test\.js$/
      ],
      loader: 'isparta-instrumenter'
    })
  }
  config.sass = [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ];
  /**
   * Plugins
   */
  config.plugins = [
    // Extract css files
    // Disabled when in test mode or not in build mode
    new ExtractTextPlugin('[name].[hash].css', {
      disable: !BUILD || TEST
    })
  ];
  // Skip rendering index.html in test mode
  if (!TEST) {
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
        minify: BUILD
      })
    )
  }
  // Add build specific plugins
  if (BUILD) {
    config.plugins.push(
      // Only emit files when there are no errors
      new CleanWebpackPlugin(['build'],{
        root: __dirname,
        verbose: true,
        dry: false
      }),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new TransferWebpackPlugin([
        { from: 'component/common', to: 'common' }
      ], path.resolve(__dirname, 'src/'))
    )
  }
  config.devServer = {
    contentBase: './build',
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  };
  return config;
};

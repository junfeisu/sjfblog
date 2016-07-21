'use strict';
var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var autoprefixer = require('autoprefixer-core');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var fs =require('fs')

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
      loader: 'html-loader'
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
  // if (!TEST) {
  //   // Render index.html
  //   config.plugins.push(
  //     new HtmlWebpackPlugin({
  //       template: './src/index.html',
  //       inject: 'body',
  //       minify: BUILD
  //     })
  //   )
  // }
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
      new CopyWebpackPlugin([
        { from: 'src/component/common', to: 'common' },
        { from: 'src/index.html', to: 'index.html'}
      ]),
      function () {
        this.plugin('done', function(stats){
          var hash = stats.hash;
          if(stats.hash) {
            const htmlFile = './build/index.html'
            var html = fs.readFileSync(path.join(__dirname, htmlFile), 'utf-8')
            var newHtmlpath = 'http://localhost:8080/app.bundle.js'
            var newHtml = html.replace('./app.js',newHtmlpath)
            fs.writeFileSync(path.join(__dirname, htmlFile), newHtml)
          }
        })
      }
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

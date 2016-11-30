// Author: Martin Bucher

var webpack = require('webpack');
var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Directory for Input file
var APP_DIR = path.resolve(__dirname, '_src/_app');

// Directory for compiled file (ouput)
var BUILD_DIR = path.resolve(__dirname, '_src/_public');

var config = {

  entry: APP_DIR + '/index.jsx',

  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },

  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['_src'] }
    })
  ]

};

module.exports = config;
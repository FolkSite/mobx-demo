const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  target: 'web',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        plugins: [
          'babel-plugin-transform-class-properties',
          'babel-plugin-transform-decorators-legacy',
        ],
        presets: [
          [
            'env',
            {
              targets: {
                browsers: [
                  'last 2 versions',
                  'safari >= 7',
                ],
              },
              include: [
                'transform-es2015-arrow-functions',
                'es6.map',
              ],
              modules: false,
              useBuiltIns: 'entry',
            },
          ],
        ],
      },
    }],
  },
  plugins: [
    new UglifyJSPlugin(),
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map',
};

const mainConfig = Object.assign({}, config, {
  name: 'main',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'bundle.js'
  },
});
module.exports = [mainConfig];

/**
 * @author NZQ
 * @data 2018/8/22
 * @Description : 开发
 */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entryJSON = require('./entry.json');
const globalLessVars = require('../src/assets/less/global_less_vars');
/*const WebpackModuleHotAccept = require('webpack-module-hot-accept');*/

function resolve (dir) {
  return path.resolve(__dirname, dir);
}

const  htmlPlugins = entryJSON.map(page => {
  return new HtmlWebpackPlugin({
    filename: resolve(`../dist/html/${page.url}.html`),
    template: resolve(`../src/page/${page.url}/index.html`),
    chunks:[page.url],
    inject: true,
  })
})

module.exports = merge(common, {
    mode: "development",
    devtool: '#cheap-module-eval-source-map',
    output:{
      path:resolve("../dist"),
      filename:'script/[name].[hash].min.js',
      publicPath : '../',
      chunkFilename: 'script/[name].[hash].min.js',
    },
    devServer: {
      port : 3000,
      contentBase: path.resolve(__dirname, "../dist/"),
      publicPath:'/',
      hot: true,
      overlay: true,
      compress: true
    },
    module: {
      rules: [
        {
          test: /\.(le|c)ss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                globalVars: globalLessVars
              }
            }
          ],
        },
      ]
    },
 /*   optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },*/
    plugins: ([
      new webpack.HotModuleReplacementPlugin(),
    ]).concat(htmlPlugins)
});
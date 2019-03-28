/**
 * @author NZQ
 * @data 2018/8/22
 * @Description : 共同
 */

// 引入插件
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const entryJSON = require('./entry.json'); // 多入口管理文件
const path = require('path');
const vendorArr = Object.keys((require('../package')).dependencies);
const glob = require('glob-all');
const PurifyCSSPlugin = require('purifycss-webpack');

function resolve (dir) {
  return path.resolve(__dirname, dir)
}
// 入口管理
let entry = {
  //string|object|array,起点或者是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行
  // 引入jQuery，这个是为了配合 webpack.optimize.CommonsChunkPlugin 这个插件使用。
}
// entry
entryJSON.map(page => { // 利用配置的入口的json文件生成相应的入口
  entry[page.url] = path.resolve(__dirname, `../src/page/${page.url}/index.js`)
})
//
// vendorArr.splice(vendorArr.indexOf("x-editable"),1)
// entry["vendor"] = vendorArr;

module.exports = {
  // 入口文件
  entry: entry,
  target: 'web',
  module: { //处理项目中的不同的模块
        rules: [
          {
            test: /\.js$/,
            loader: ['babel-loader'],
            include: [resolve('../src'), resolve('node_modules/webpack-dev-server/client')]
            // https://www.cnblogs.com/old-street-hehe/p/7116215.html -- import问题
            // https://blog.csdn.net/chenyHahaha/article/details/80606430
          },
          { // 实现资源复用
              test: /\.html$/,
              loader: 'html-loader',
          },
       /*   { // 字符串 改变html热加载页面
            test: /\.(html|htm)$/,
            loader: 'raw-loader',
          },
          { // 解决HTML文件中引入 Img标签的问题
            test: /\.(html|htm)$/,
            loader: 'html-withimg-loader'
          },*/
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  // 10kb
                  limit: 10000,
                 // name: './font/[name].[hash].[ext]',
                  outputPath: 'font/'
                }
              }
            ]
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use:[
              {
                loader: 'url-loader',
                options: {
                  // 10kb
                  limit: 10000,
                  //name: './img/[name].[hash].[ext]',
                  outputPath: 'img/'
                }
              }
            ]
          },
        ]
    },
  // 文件引入路径解析
  resolve: {
      // 默认--https://www.cnblogs.com/joyco773/p/9049760.html
      extensions: ['.js', '.json'],
    alias: {
        "@" : resolve("../src/assets"),
        "static": resolve("../src/assets")
      },
  },
  // 将插件添加到webpack中
  // 如果还有其他插件，将两个数组合到一起就行了
  plugins: [
    new CleanWebpackPlugin('./dist', {
      "root": resolve("../"),// 一个根的绝对路径 默认
      "verbose": true,// 将log写到 console.
      // "dry": false,// 不要删除任何东西，主要用于测试.
      // "exclude": ["files","to","ignore"]//排除不删除的目录，主要用于避免删除公用的文件
    }),
    // https://www.jianshu.com/p/24b6156f40c6 --- ProvidePlugin 相关
    new PurifyCSSPlugin({
      paths: glob.sync([ // 传入多文件路径
        path.resolve(__dirname, './src/**/*.html'), // 处理根目录下的html文件
        path.resolve(__dirname, './src/**/*.js') // 处理src目录下的js文件
      ])
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      "jQuery" : "jquery",
      "window.jQuery" : "jquery",
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    }),
   /* new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor','runtime'],
      filename: '[name].js',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: '[name].js',
      // chunks:  //从first.js和second.js中抽取commons chunk
    }),*/
    new CopyWebpackPlugin([{
      from: resolve('../static'),
      to: 'static',
      ignore: ['.*']
    }]),
  ]
}

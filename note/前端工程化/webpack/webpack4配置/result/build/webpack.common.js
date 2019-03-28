/**
 * @author NZQ
 * @data 2018/8/22
 * @Description : 共同
 */

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const entryJSON = require('./entry.json'); // 多入口管理文件
const path = require('path');
const glob = require('glob-all');
const PurifyCSSPlugin = require('purifycss-webpack');

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

let entry = {
}

entryJSON.map(page => { // 利用配置的入口的json文件生成相应的入口
  entry[page.url] = path.resolve(__dirname, `../src/page/${page.url}/index.js`)
})


module.exports = {
  // 入口文件
  entry: entry,
  target: 'web',
  module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('../src'), resolve('node_modules/webpack-dev-server/client')]
          },
          {
              test: /\.html$/,
              use: [{
                loader: 'html-loader',
                options: { minimize: true }
              }]
          },
         /* {
            test: /\.less$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: { importLoaders: 2 }
              },
              'postcss-loader',
              {
                loader: 'less-loader',
                options: {
                  globalVars: globalLessVars
                }
              }
            ]
          },
          {
            test: /\.css/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: { importLoaders: 1 }
              },
              'postcss-loader'
            ]
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
  resolve: {
      extensions: ['.js', '.json'],
        alias: {
        "@" : resolve("../src/assets"),
        "static": resolve("../src/assets")
      },
  },
  plugins: [
    new CleanWebpackPlugin('./dist', {
      "root": resolve("../"),// 一个根的绝对路径 默认
      "verbose": true,// 将log写到 console.
    }),
    new PurifyCSSPlugin({ // PurifyCSS Plugin可以做到只加载当前页面所需要的样式
      paths: glob.sync([
        path.resolve(__dirname, './src/**/*.html'),
        path.resolve(__dirname, './src/**/*.js')
      ])
    }),
    /* process.env.NODE_ENV !== 'production' */
    new webpack.ProvidePlugin({
      $: 'jquery',
      "jQuery" : "jquery",
      "window.jQuery" : "jquery",
    }),
    new CopyWebpackPlugin([{
      from: resolve('../static'),
      to: 'static',
      ignore: ['.*']
    }]),
  ]
}
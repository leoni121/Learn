'use strict'
const path = require('path')
const utils = require('./utils')
/**
 * [引入index.js文件路径]
 */
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

/**
 * [获取文件路径]
 * @dir [文件名称]
 * @_dirname为当前模块文件所在目录的绝对路径*
 * @return 文件绝对路径
 */
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  /**
   * [入口文件配置]
   */
  // http://www.cnblogs.com/princesong/p/6728250.html
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  /**
   * [文件导出配置]
   */
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    /**
     * [extensions: 配置文件的扩展名,当在import文件时,不用需要添加扩展名]
     */
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      /**
       * [使用vue-loader将vue文件转化成js的模块]
       */
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          //  [图片、音像、字体都使用url-loader进行处理，超过10000会编译成base64]
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      /**
       * [canvas 解析]
       */
      /*{
        test: path.resolve(`${resolve('src')}/lib/jtopo.js`),
        loader: ['exports-loader?window.JTopo', 'script-loader']
      }*/
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

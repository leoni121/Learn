/**
 * @author NZQ
 * @data 2018/8/22
 * @Description : 生产环境
 */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entryJSON = require('./entry.json');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // CSS压缩丑化
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // JavaScript压缩丑化
const globalLessVars = require('../src/assets/less/global_less_vars');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function resolve (dir) {
  return path.resolve(__dirname, dir);
}

// 出口管理 ， 因为多入口，所以要多个HtmlWebpackPlugin，每个只能管一个入口
const  htmlPlugins = entryJSON.map(page => {
  return new HtmlWebpackPlugin({
    filename: resolve(`../dist/html/${page.url}.html`),
    template: resolve(`../src/page/${page.url}/index.html`),
    inject: true, //(true/body , head , false) 向template或者templateContent中注入所有静态资源，不同的配置值注入
    chunks:['vendor', 'common', page.url],
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
    },
  })
})

module.exports = merge(common, {
  mode: "production",
  output:{
    path:resolve("../dist"),
    filename:'script/[name].[chunkhash].min.js',
    publicPath : '../',
    chunkFilename: 'script/[name].[chunkhash].js',
  },
  module: {
    rules: [
       {
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
       },
    ]
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    noEmitOnErrors: true, // 默认为true,编译错误的时候是否不生成资源。
    // 一般不建议配置namedModules,namedChunks(另两个模块)
    // removeAvailableModules,removeEmptyChunks,mergeDuplicateChunks,flagIncludedChunks 这4个参数构建默认都是true,主要是用于构建优化，不需要改,基本就是字面意思。
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions:{
          safe:true,
          map: {
            inline: false
          }
        }
      })
    ],
    // 默认配置
    /*splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }*/

    splitChunks:{
      chunks: 'async', // 必须三选一： "initial" | "all"(默认就是all) | "async"
      minSize: 20000, // 最小尺寸，默认0
      minChunks: 1, // 最小 chunk ，默认1
      maxAsyncRequests: 5, // 最大异步请求数， 默认1
      maxInitialRequests: 3, // 最大初始化请求书，默认1
      name: false, // 名称，此选项可接收 function，抽取出来文件的名字，默认为 true，表示自动生成文件名；
      cacheGroups: { // 这里开始设置缓存的 chunks ，缓存组。（这才是配置的关键）， 上面（除这块的其他）的那么多参数，其实都可以不用管，当前配置它可以继承/覆盖上面 splitChunks 中所有的参数值，除此之外还额外提供了三个配置，分别为：test, priority 和 reuseExistingChunk。
        // test: 表示要过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中；
        // priority：表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算；
        // reuseExistingChunk：表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
   /*     styles: { // 通过 MiniCssExtractPlugin 生成的 CSS 文件也可以通过 SplitChunks 来进行抽取公有样式(注意将权重设置为最高，不然可能其他的 cacheGroups 会提前打包一部分样式文件)
          name: 'styles',
          test: /\.(less|css)$/,
          chunks: 'all',  // merge all the css chunk to one file
          minChunks: 1,
          reuseExistingChunk: true,
          priority: 20,
          enforce: true
        },*/
        vendor: { ////node_modules内的依赖库 key 为entry中定义的 入口名称
          name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
          chunks: 'all', // 必须三选一： "initial"(对于异步导入的文件不处理) | "all"(同时分割同步和异步代码,推荐) | "async"(默认,分割异步打包的代码，)
          priority: 10, // 缓存组优先级
          minChunks: 1,
          reuseExistingChunk: true, // 可设置是否重用该chunk（查看源码没有发现默认值）
          maxAsyncRequests: 1, // 最大异步请求数， 默认1
          maxInitialRequests: 1, // 最大初始化请求书，默认1
          test: /[\\/]node_modules[\\/]/
        },
        commons: {
          chunks: "all",
          name: "commons",
          minChunks: 2,
          priority:1,
        },
      }
    }
  },
  plugins: ([
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ]).concat(htmlPlugins)
});



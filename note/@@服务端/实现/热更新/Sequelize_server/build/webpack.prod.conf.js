'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // npm i --save-dev html-webpack-plugin@next
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 一个优化'压缩CSS的WebPack插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const utils = require('./utils')
const buildConfig = require('./config').build
const baseWebpackConfig = require('./webpack.base.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  // 覆盖 webpack.base.conf.js 中的设置
  output: {
    path: buildConfig.assetsRoot, // ../dist
    filename: utils.assetsPath('js/[name].[chunkhash:7].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:7].js')
  },
  devtool: buildConfig.devtool,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: buildConfig.productionSourceMap,
        cache: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { safe: true, map: buildConfig.productionSourceMap }
      })
    ],
  },
  plugins: [
    // css 提取
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:7].css'),
      chunkFilename: utils.assetsPath('/css/[name].[contenthash:7].css'),
      sourceMap: buildConfig.productionSourceMap
    }),
    // DLL
    /*new webpack.DllReferencePlugin({
      manifest: require('../dll/vue-manifest.json')
    }),*/
    // new webpack.DllReferencePlugin({
    //   manifest: require('../dll/ui-manifest.json')
    // }),
    
    // html模板打包
    new HtmlWebpackPlugin({
      // title: '生成的html名字',
      filename: './index.html',
      template: resolve('index.html'),
      // all javascript resources will be placed at the bottom of the body element.
      inject: true, // 允许注入打包文件（body）
      // favicon
      // meta
      minify: {
        removeComments: true, // 删除注释
        collapseWhitespace: true, // 折叠空白区域
        removeAttributeQuotes: true // 尽可能删除属性周围的引号
      },
      chunksSortMode: 'dependency' // 允许在插入到HTML之前控制chunk的排序
    }),
    
    // 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。
    /*new webpack.HashedModuleIdsPlugin(),*/
    
    // 过去 webpack 打包时的一个取舍是将 bundle 中各个模块单独打包成闭包。这些打包函数使你的 JavaScript 在浏览器中处理的更慢。相比之下，一些工具像 Closure Compiler 和 RollupJS 可以提升(hoist)或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度。
    // 这个插件会在 webpack 中实现以上的预编译功能。
    new webpack.optimize.ModuleConcatenationPlugin(),

    // This will add a script tag to the HTML generated by html-webpack-plugin
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../dll/*.dll.js'),
      publicPath: buildConfig.assetsPublicPath + 'static/js',
      outputPath: '../dist/static/js',
      includeSourcemap: false
    }),
    
    // 打包进度
    new webpack.ProgressPlugin()
  ]
})

// 动态加入 productionGzip
if (buildConfig.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip', // default
      // 处理 productionGzipExtensions 下面配置的不同的文件类型
      test: new RegExp(
        '\\.(' +
        buildConfig.productionGzipExtensions.join('|') +
        ')$'
      ),
      // 只处理大于 10KB 的文件
      threshold: 10240,
      minRatio: 0.8 // default
    })
  )
}

// 动态加入 bundleAnalyzerReport
if (buildConfig.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
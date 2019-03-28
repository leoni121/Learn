/**
 * @author NZQ
 * @data 2018/8/22
 * @Description : 开发
 */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const globalLessVars = require('../src/assets/less/global_less_vars');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const entryJSON = require('./entry.json'); // 多入口管理文件
const WebpackModuleHotAccept = require('webpack-module-hot-accept');

function resolve (dir) {
  return path.resolve(__dirname, dir);
}

// 出口管理 ， 因为多入口，所以要多个HtmlWebpackPlugin，每个只能管一个入口
const  htmlPlugins = entryJSON.map(page => {
  return new HtmlWebpackPlugin({
    filename: resolve(`../dist/html/${page.url}.html`),
    template: resolve(`../src/page/${page.url}/index.html`),
    chunks:['common', page.url],
    inject: true,
  })
})

module.exports = merge(common, {
    devtool: '#cheap-module-eval-source-map',
    output:{//指示webpack如何去输出，以及在哪里输出你的「bundle、asset和其他你所打包或使用webpack载入的任何内容」。
      path:resolve("../dist"),//目录对应一个绝对路径
      //pathinfo:true,//告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释。默认是false，pathinfo是在开发环境中使用，在生产环境中就不推荐
      //filename选项决定了在每个输出bundle的名称。这些bundle将写入到「output.path」选项指定的目录下。2017-08-09版本叠加，添加hash，有利于管理
      filename:'script/[name].[hash].min.js',
      //值是string类型，对于加载（on-demand-load）或加载外部资源(external resources)（如图片、文件等）来说 ，如果指定了一个错误的值，则在加载这些资源的时候会收到404错误
      publicPath : '../',
      // 为动态加载的 Chunk 配置输出文件的名称
      chunkFilename: 'script/[name].[hash].min.js',
    },
    devServer: {
      port : 3000,
      contentBase: path.resolve(__dirname, "../dist/"),
      //contentBase: path.resolve(__dirname, "../dist/html/"), 也行
      // 决定外部能够以什么样的路径访问到构建的文件。
      publicPath:'/',//用于确定从哪里提供bundle，并且此选项优先
      hot: true,
      overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
      compress: true
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'postcss-loader' , {
            loader: 'less-loader',
            options: {
              globalVars: globalLessVars
            }
          }]
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
          },
      ]
    },
    plugins: ([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      // 热更新(HMR)不能和[chunkhash]同时使用。 // 通过NamedModulesPlugin 或是HashedModuleldsPlugin 使再次打包文件名不变。
      new webpack.NamedModulesPlugin(),
      // HMR：https://www.webpackjs.com/guides/hot-module-replacement --- 相关
      new webpack.HotModuleReplacementPlugin(),
      // new webpack.NoEmitOnErrorsPlugin(), 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段
      new ExtractTextPlugin({ // 从bundle 中提取
        filename:(getPath)=>{
          return getPath('css/[name].[hash].min.css').replace('css/js', 'css');//.js文件中的.css|.less|.sass内容转换成转换成.css文件。 2017-08-09,添加hash，有利于资源管理
        },
        disable:false,//禁用插件为false
        // allChunks:true
      }),

    ]).concat(htmlPlugins)
});

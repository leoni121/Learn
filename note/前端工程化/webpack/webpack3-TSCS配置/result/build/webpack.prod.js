/**
 * @author NZQ
 * @data 2018/8/22
 * @Description : 生产环境
 */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象;
const globalLessVars = require('../src/assets/less/global_less_vars');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // JavaScript压缩丑化
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // CSS压缩丑化
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 将html中引入的js进行处理
const entryJSON = require('./entry.json'); // 多入口管理文件

function resolve (dir) {
  return path.resolve(__dirname, dir);
}

// 出口管理 ， 因为多入口，所以要多个HtmlWebpackPlugin，每个只能管一个入口
const  htmlPlugins = entryJSON.map(page => {
  return new HtmlWebpackPlugin({
    filename: resolve(`../dist/html/${page.url}.html`),
    template: resolve(`../src/page/${page.url}/index.html`),
    inject: true, //(true/body , head , false) 向template或者templateContent中注入所有静态资源，不同的配置值注入
    chunks:['common', page.url],
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
    },
    // hash: true, // 为静态资源生成hash值
    // minify: false,   // 压缩，如果启用这个的话，需要使用html-minifier，不然会直接报错
    // xhtml: true,    // 自闭标签
    //chunksSortMode: 'dependency'
  })
})

module.exports = merge(common, {
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
        // http://www.mamicode.com/info-detail-1752561.html
        use : ExtractTextPlugin.extract({
          fallback : 'style-loader',
          /* { // 先前配置
                 loader: 'css-loader',
                 options: {
                     root: resolve(__dirname, '../src/assets'),   // url里，以 / 开头的路径，去找src/assets文件夹
                        minimize: true, // 压缩css代码
                        sourceMap: false,    // sourceMap，默认关闭
                        alias: {
                            // '~@/logo.png' 这种写法，会去找src/img/logo.png这个文件
                            '@': resolve(__dirname, '../src')
                        }
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: './config'
                        },
                        sourceMap: true
                    }
                },*/
          use: ['css-loader', 'postcss-loader' , {
            loader: 'less-loader',
            options: {
              globalVars: globalLessVars
            }
          }],
        })
      },
      {
        test: /\.css$/,
        use : ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader'],
          fallback : 'style-loader',
          publicPath: '../'
        }),
      },
    ]
  },
  plugins: ([
    new OptimizeCssAssetsPlugin({//对生产环境的css进行压缩
      cssProcessorOptions:{
        safe:true,
        map: {
          inline: false
        }
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin({ // 从bundle 中提取
      filename:(getPath)=>{
        return getPath('css/[name].[chunkhash].min.css').replace('css/js', 'css');//.js文件中的.css|.less|.sass内容转换成转换成.css文件。 2017-08-09,添加hash，有利于资源管理
      },
      disable:false,//禁用插件为false
      // allChunks:true
    }),
    new UglifyJSPlugin({ //压缩js代码--链接 https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin/,
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true,
          collapse_vars: true,
        }
      },
      parallel: true
    }),
    new webpack.HashedModuleIdsPlugin(), // 通过NamedModulesPlugin 或是HashedModuleldsPlugin 使再次打包文件名不变。
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]).concat(htmlPlugins)
});



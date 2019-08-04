/**
 * @author NZQ
 * @data 2018/8/22
 * @Description : 共同
 */

// 引入插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const globalLessVars = require('../src/assets/less/global_less_vars');
const path = require('path');
// 多入口管理文件
const entryJSON = require('../config/entry.json');

// 入口管理
let entry = {
    // 引入jQuery，这个是为了配合 webpack.optimize.CommonsChunkPlugin 这个插件使用。
}
entryJSON.map(page => {
    entry[page.url] = path.resolve(__dirname, `../src/page/${page.url}/index.js`)
})

// 出口管理 ， 因为多入口，所以要多个HtmlWebpackPlugin，每个只能管一个入口
let htmlPlugins = entryJSON.map(page => {
    return new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, `../dist/html/${page.url}.html`),
        template: path.resolve(__dirname, `../src/page/${page.url}/index.html`),
        chunks: ['vendor','foo',page.url], // 实现多入口的核心，决定自己加载哪个js文件，这里的 page.url 指的是 entry 对象的 key 所对应的入口打包出来的js文件
        hash: true, // 为静态资源生成hash值
        minify: true,   // 压缩，如果启用这个的话，需要使用html-minifier，不然会直接报错
        xhtml: true,    // 自闭标签
    })
})

module.exports = {
    // 入口文件
    entry: entry,
    module: {
        // loader放在rules这个数组里面
        rules: [
            // less
            {
                test: /\.less$/,
                // http://www.mamicode.com/info-detail-1752561.html
                use : ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                root: path.resolve(__dirname, '../src/assets'),   // url里，以 / 开头的路径，去找src/static文件夹*/
                                minimize: true, // 压缩css代码
                                sourceMap: false,    // sourceMap，默认关闭
                                alias: {
                                    // '~@/logo.png' 这种写法，会去找src/img/logo.png这个文件
                                    '@': path.resolve(__dirname, '../src')
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
                        },
                        {
                            loader: 'less-loader',   // compiles Less to CSS
                            options: {
                                globalVars: globalLessVars
                            }
                        }
                    ],
                    fallback : 'style-loader'
                })
            },
            {
                test: /\.(png|jpg|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 注意这里有一个限制图片大小的
                            limit: 5000,
                            name: '[hash:8].[ext]',
                            // 这个有点相对于output路径的赶脚
                            outputPath: function (fileName) {
                                return "./img/" + fileName   // 后面要拼上这个 fileName 才行
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                // 写法一
                loader: 'babel-loader',
                exclude: /node_modules/,
                // https://www.cnblogs.com/old-street-hehe/p/7116215.html -- import问题
                // https://blog.csdn.net/chenyHahaha/article/details/80606430
                query: {
                    presets: ['es2015'],
                    plugins: ['syntax-dynamic-import']
                }
            },
            // less
            {
                test: /\.css$/,
                use : ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        }
                    ],
                    fallback : 'style-loader'
                })
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-withimg-loader',
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash:8].[ext]',
                            outputPath: function (fileName) {
                                return 'fonts/' + fileName    // 后面要拼上这个 fileName 才行
                            }
                        }
                    }
                ]
            }
        ]
    },
    // 文件引入路径解析
    resolve: {
        // 默认--https://www.cnblogs.com/joyco773/p/9049760.html
        extensions: ['.js', '.json'],
        alias: {
            "@" : "../../assets"
        },
    },
    // 将插件添加到webpack中
    // 如果还有其他插件，将两个数组合到一起就行了
    plugins: ([
        new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
            root: path.resolve(__dirname, '../'),
            verbose: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name : "vendor",
            minChunks: 2,
        }),
        // https://www.cnblogs.com/dong93/p/7655171.html  版本原因，不换了
        new webpack.optimize.CommonsChunkPlugin({
            name: "foo", // 这个对应的是 entry 的 key
            minChunks: 2
        }),
        // https://www.jianshu.com/p/24b6156f40c6 --- ProvidePlugin 相关
        new webpack.ProvidePlugin({
            $: 'jquery',
            "jQuery" : "jquery",
            "window.jQuery" : "jquery",
        }),
        new ExtractTextPlugin({
            filename : 'less/[name].[contenthash:8].css'
        }),
    ]).concat(htmlPlugins)
}

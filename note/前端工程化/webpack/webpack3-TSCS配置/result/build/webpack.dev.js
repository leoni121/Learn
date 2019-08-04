/**
 * @author NZQ
 * @data 2018/8/22
 * @Description : 开发
 */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
module.exports = merge(common, {
    // 出口文件 -- 这里只能用【hash】
    output: {
        path: __dirname + '/../dist',
        // 文件名，将打包好的导出为bundle.utilJs
        filename: 'script/[name].[hash:8].js',
        // publicPath指定的是构建后在html里的路径, 处理静态资源引用地址用的
        // 这里是相对于 filename的 路径
         publicPath : '/', //--- 加入公共路径，   导致找不到文件
        // 为动态加载的 Chunk 配置输出文件的名称
        chunkFilename: 'script/[name].[hash:8].js'
    },
    devtool: 'inline-source-map',
    // webpack-dev-server
    devServer: {
        /*contentBase: path.resolve(__dirname, "../dist/"),*/
        contentBase : "../dist/",
        hot : true,
        port : 3000,
    },
    plugins: [
        // 热更新(HMR)不能和[chunkhash]同时使用。
        new webpack.NamedModulesPlugin(),
        // HMR：https://www.webpackjs.com/guides/hot-module-replacement --- 相关
        new webpack.HotModuleReplacementPlugin(),
    ]
});

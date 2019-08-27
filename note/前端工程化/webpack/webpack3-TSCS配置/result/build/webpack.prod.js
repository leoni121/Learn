/**
 * @author NZQ
 * @data 2018/8/22
 * @Description : 生产
 */
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
    const CompressionWebpackPlugin = require("compression-webpack-plugin");


module.exports = merge(common, {
    // 出口文件
    output: {
        path: __dirname + '/../dist',
        // 文件名，将打包好的导出为bundle.utilJs
        filename: 'script/[name].[chunkhash:8].js',
        // publicPath指定的是构建后在html里的路径, 处理静态资源引用地址用的
        // 这里是相对于 filename的 路径
        publicPath : '../',
        // 为动态加载的 Chunk 配置输出文件的名称
        chunkFilename: 'script/[name].[chunkhash:8].js'
    },
    plugins: [
        // https://segmentfault.com/a/1190000008995453
        new webpack.optimize.UglifyJsPlugin({
            minify: true,
            beautify: false,
            warning : false,
            compress : {
                warnings: false,
                drop_console: true,
                collapse_vars: true,
                reduce_vars: true,
            }
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip', // default
            test: new RegExp(
              '\\.(js|css)$'
              // '\\.(' +
              // configItem.productionGzipExtensions.join('|') +
              // ')$'
            ),
            // 只处理大于 10KB 的文件
            threshold: 10240,
            minRatio: 0.8 // default
        })
    ]/*.concat(plugins)*/
});



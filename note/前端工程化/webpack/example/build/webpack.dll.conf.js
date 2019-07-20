const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
console.log(process.env.NODE_ENV);

module.exports = {
  mode: 'production',
  // add-asset-html-webpack-plugin 插件使用时 没有加 includeSourcemap， 则需要 .map 文件
  // devtool: '#source-map',
  entry: {
    vue: ['vue/dist/vue.esm.js', 'vue-router', 'vuex', 'axios'],
    // ui: ['element-ui', 'echarts']
  },
  output: {
    path: path.join(__dirname, '../dll'),
    filename: '[name].dll.js',
    library: '[name]_[hash]'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: false,
        cache: true
      })
    ]
  },
  
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dll', '[name]-manifest.json'),
      name: '[name]_[hash]'
    }),
   /* new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })*/
  ]
}
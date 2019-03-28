const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = require('./config')
const utils = require('./utils')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const isProduction = process.env.NODE_ENV === 'production'
const devConfig = config.dev, buildConfig = config.build

function resolve(dir) {
  // path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
  // path.join('/foo', 'bar', 'baz/asdf')
  // 返回: '/foo/bar/baz/asdf'
  return path.join(__dirname, '..', dir)
}
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: isProduction ? buildConfig.assetsPublicPath : devConfig.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        // To be safe, you can use enforce: "pre" section to check source files, not modified by other loaders (like babel-loader)
        enforce: 'pre',
        include: [resolve('src')],
        exclude: /node_modules/,
        options: {
          // 引入插件
          formatter: require('eslint-friendly-formatter'),
          emitError: devConfig.showEslintErrorsInOverlay,
          emitWarning: !devConfig.showEslintErrorsInOverlay,
          // quiet 
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        include: resolve('src'),
        options: {
          cacheDirectory: resolve('./cache-loader'),
          cacheIdentifier: 'cache-loader:{version} {process.env.NODE_ENV}' // 标识
        }
      },
      {
        test: /\.js$/,
        use: isProduction ? [
          // 在磁盘（默认）或数据库中缓存后续loader的结果
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: resolve('cache-loader'),
            }
          },
          'babel-loader'
        ] : 'babel-loader',
        exclude: /node_modules/,
        include: resolve('src')
      },
      {
        test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      { // 它会应用到普通的 `.css` 文件
        // 以及 `.vue` 文件中的 `<style>` 块
        test: /\.s?css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    
    new webpack.DllReferencePlugin({
      manifest: require('../dll/vue-manifest.json')
    }),
    
    // 复制静态文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: isProduction ? buildConfig.assetsSubDirectory : devConfig.assetsSubDirectory,
        ignore: ['.*'] // 表示要忽略的文件
      }
    ]),
  ]
}
[TOC]



## 1. url-loader 和 file-loader 的区别及使用 ##

url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader

url-loader工作分两种情况：

1. 文件大小小于limit参数，url-loader将会把文件转为DataURL。

- 文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。因此我们只需要安装url-loader即可。
>小提示： webpack最终会将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的。这就会导致图片引入失败。 file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件

下面例子涉及到了4个参数：`limit`、`name`、`outputPath`、`publicPath`，file-loader相关的是`name`、`outputPath`和`outputPath`。下面解释一下这3个参数

1. `name`表示输出的文件名规则，如果不添加这个参数，输出的就是默认值：文件哈希。加上[path]表示输出文件的相对路径与当前文件相对路径相同，加上[name].[ext]则表示输出文件的名字和扩展名与当前相同。加上[path]这个参数后，打包后文件中引用文件的路径也会加上这个相对路径。

- `outputPath`表示输出文件路径前缀。图片经过url-loader打包都会打包到指定的输出文件夹下。但是我们可以指定图片在输出文件夹下的路径。比如outputPath=img/，图片被打包时，就会在输出文件夹下新建（如果没有）一个名为img的文件夹，把图片放到里面。

- `publicPath`表示打包文件中引用文件的路径前缀，如果你的图片存放在CDN上，那么你上线时可以加上这个参数，值为CDN地址，这样就可以让项目上线后的资源引用路径指向CDN了。

    ```js
    module: {  
            rules: [  
                {  
                    test: /\.css$/,  
                    use: ['style-loader', 'css-loader']  
                },  
                {  
                    test: /\.jpeg$/,  
                    use: 'url-loader?limit=1024&name=[path][name].[ext]&outputPath=img/&publicPath=output/',  
                }  
          	  ]  
    	} 
    ```


## 2. webpack-dev-server和webpack-dev-middleware的区别 ##

[参考地址1-博客](https://www.cnblogs.com/wangpenghui522/p/6826182.html)， [参考地址2-官网](https://www.webpackjs.com/guides/development/)

### 2.1 webpack-dev-server ###

`webpack-dev-server`实际上相当于启用了一个`express`的`Http服务器+调用webpack-dev-middleware`。它的作用主要是用来伺服资源文件。这个`Http服务器`和`client`使用了`websocket`通讯协议，原始文件作出改动后，`webpack-dev-server`会用webpack实时的编译，再**用webpack-dev-middleware将webpack编译后文件会输出到内存中。**适合纯前端项目，很难编写后端服务，进行整合。

当使用 **webpack dev server 和 Node.js API 时**，不要将 dev server 选项放在 webpack 配置对象(webpack config object)中。而是，在创建选项时，将其作为第二个参数传递。例如：

```js
new WebpackDevServer(compiler, options)
```

想要启用 HMR，还需要修改 webpack 配置对象，使其包含 HMR 入口起点。`webpack-dev-server` package 中具有一个叫做 `addDevServerEntrypoints` 的方法，你可以通过使用这个方法来实现。这是关于如何使用的一个小例子：

**dev-server.js**

```javascript
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
```

> *如果你在* [使用 `webpack-dev-middleware`](https://www.webpackjs.com/guides/development#using-webpack-dev-middleware)*，可以通过* [`webpack-hot-middleware`](https://github.com/webpack-contrib/webpack-hot-middleware) *package 包，在自定义开发服务下启用 HMR。*

### 2.2 webpack-dev-middleware ###

[配置参考](https://segmentfault.com/a/1190000011761306)

webpack-dev-middleware输出的文件存在于内存中。你定义了 webpack.config，webpack 就能据此梳理出entry和output模块的关系脉络，而 webpack-dev-middleware 就在此基础上形成一个文件映射系统，每当应用程序请求一个文件，它匹配到了就把内存中缓存的对应结果以文件的格式返回给你，反之则进入到下一个中间件。

因为是内存型文件系统，所以重建速度非常快，很适合于开发阶段用作静态资源服务器；因为 webpack 可以把任何一种资源都当作是模块来处理，因此能向客户端反馈各种格式的资源，所以可以替代HTTP 服务器。事实上，大多数 webpack 用户用过的 webpack-dev-server 就是一个 express＋webpack-dev-middleware 的实现。二者的区别仅在于 webpack-dev-server 是封装好的，除了 webpack.config 和命令行参数之外，很难去做定制型开发。而 webpack-dev-middleware 是中间件，可以编写自己的后端服务然后把它整合进来，相对而言比较灵活自由。

```js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

### 2.3 webpack-hot-middleware ###

是一个结合webpack-dev-middleware使用的middleware，它可以实现浏览器的无刷新更新（hot reload），这也是webpack文档里常说的HMR（Hot Module Replacement）。HMR和热加载的区别是：热加载是刷新整个页面。启用 HMR也可以通过更新 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 的配置，和使用 webpack 内置的 HMR 插件。



## 3. NamedModulesPlugin 和 HashedModuleIdsPlugin 的区别及使用 ##

### 3.1 NamedModulesPlugin ###

[参考](https://www.jianshu.com/p/8499842defbe)

> 当开启 [HMR](https://www.webpackjs.com/guides/hot-module-replacement) 的时候使用该插件会显示模块的相对路径，建议用于开发环境。

这个插件的作用是在*热加载时直接返回更新文件名*，而不是文件的id。

要这种效果

```js
[HMR] Updated modules:
[HMR]  - ./example.js
[HMR]  - ./hmr.js
[HMR] Update applied.
```

而不是这样

```js
[HMR] Updated modules:
[HMR]  - 39
[HMR]  - 40
[HMR] Update applied.
```

具体使用就是这样

```js
plugin: [
    new webpack.NamedModulesPlugin(),
]
```

### 3.2 HashedModuleIdsPlugin ###

[参考-官网](https://www.webpackjs.com/plugins/hashed-module-ids-plugin/)

> 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。

该插件支持以下参数：

- `hashFunction`: 散列算法，默认为 'md5'。支持 Node.JS [`crypto.createHash`](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options) 的所有功能。
- `hashDigest`: 在生成 hash 时使用的编码方式，默认为 'base64'。支持 Node.js [`hash.digest`](https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding) 的所有编码。
- `hashDigestLength`: 散列摘要的前缀长度，默认为 4。

**用法**

```js
new webpack.HashedModuleIdsPlugin({
  hashFunction: 'sha256',
  hashDigest: 'hex',
  hashDigestLength: 20
})
```

### 5.3 使用场景 ###

[参考-官网](https://www.webpackjs.com/plugins/hashed-module-ids-plugin/)

`output`如下设置:

```js
output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
}

```

***公共依赖没有变,公共文件的hash 改变?***

每个 [`module.id`](https://www.webpackjs.com/api/module-variables#module-id-commonjs-) 会基于默认的解析顺序(resolve order)进行增量。也就是说，当解析顺序发生变化，ID 也会随之改变。

> 解决：[`NamedModulesPlugin`](https://www.webpackjs.com/plugins/named-modules-plugin)，将使用模块的路径，而不是数字标识符。虽然此插件有助于在开发过程中输出结果的可读性，然而执行时间会长一些。第二个选择是使用 [`HashedModuleIdsPlugin`](https://www.webpackjs.com/plugins/hashed-module-ids-plugin)，推荐用于生产环境构建



## 4. webpack-merge ##

[参考-github](https://github.com/survivejs/webpack-merge)

**webpack-merge**提供了一个`merge`连接数组并合并创建新对象的函数。如果遇到函数，它将执行它们，通过算法运行结果，然后再次将返回的值包装在函数中。

这种行为在配置webpack时特别有用，尽管它有超出它的用途。无论何时需要合并配置对象，**webpack-merge**都可以派上用场。

还有一个特定于webpack的合并变体`merge.smart`，它可以考虑webpack特性（即，它可以展平加载器定义）。

**标准合并 merge(...configuration | [...configuration])**

`merge`是API的核心，也是最重要的想法。除非您想进一步定制，否则通常这就是您所需要的。

```js
//默认API 
module.exports =  merge（object1，object2，object3， ...）;

//您可以直接传递对象数组。
//这适用于所有可用的功能。
module.exports =  merge（[object1，object2，object3]）;
```



## 5. ExtractTextWebpackPlugin 和 MiniCssExtractPlugin ##

[参考-官网](https://www.webpackjs.com/plugins/extract-text-webpack-plugin/), [项目webpack3 迁移到 webpack4 可参考](https://blog.csdn.net/lqlqlq007/article/details/83865176)

### 5.1 MiniCssExtractPlugin  ###

[参考-官网](https://www.npmjs.com/package/mini-css-extract-plugin)

> English: This plugin should be used only on `production` builds without `style-loader` in the loaders chain, especially if you want to have HMR in `development`.
>
> 中：在使用时不能喝]和  `  style-loader`共存，只用于生产环境

**webpack.config.js**

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
 
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  }
}
```

### 5.2 ExtractTextWebpackPlugin ###

[参考-官网](https://www.webpackjs.com/plugins/extract-text-webpack-plugin/)

```js
module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
```

## 6 CommonsChunkPlugin ##

`CommonsChunkPlugin` 插件，是一个可选的用于建立一个独立文件(又称作 chunk)的功能，这个文件包括多个入口 `chunk` 的公共模块。

> CommonsChunkPlugin 已经从 webpack v4 legato 中移除。想要了解在最新版本中如何处理 chunk，请查看 [SplitChunksPlugin](https://www.webpackjs.com/plugins/split-chunks-plugin/)。

**使用**

```js
 plugina: [
     new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      })
 ]
```

> *注意，引入顺序在这里很重要。*`CommonsChunkPlugin` *的* `'vendor'` *实例，必须在* `'manifest'` *实例之前引入。*

## 7. ProvidePlugin ##

[参考-官网](<https://www.webpackjs.com/plugins/provide-plugin/>)

使用 [`ProvidePlugin`](https://www.webpackjs.com/plugins/provide-plugin) 后，能够在通过 webpack 编译的每个模块中，通过访问一个变量来获取到 package 包，而不必到处 `import` 或 `require`。

**使用**

```js
new webpack.ProvidePlugin({
  identifier: 'module1',
  // ...
})
```

or

```js
new webpack.ProvidePlugin({
  identifier: ['module1', 'property1'],
  // ...
})
```

任何时候，当 `identifier` 被当作未赋值的变量时，`module` 就会自动被加载，并且 `identifier` 会被这个 `module` 输出的内容所赋值。（模块的 `property` 用于支持命名导出(named export)）。

> 对于 ES2015 模块的 default export，你必须指定模块的 default 属性，才能使用
>
> 本质上，我们所做的，就是告诉 webpack如果你遇到了至少一处用到 `lodash` 变量的模块实例，那请你将 `lodash` package 包引入进来，并将其提供给需要用到它的模块

## 8. imports-loader ##

[参考-官网](<https://www.webpackjs.com/loaders/imports-loader/>)

The imports loader allows you to use modules that depend on specific global variables.

当模块运行在 CommonJS 环境下这将会变成一个问题，也就是说此时的 `this` 指向的是 `module.exports`。在这个例子中，你可以**通过使用 [`imports-loader`](https://www.webpackjs.com/loaders/imports-loader/) 覆写 `this**`

**使用**

```js
// ./webpack.config.js
module.exports = {
    ...
    module: {
        rules: [
            {
                test: require.resolve("some-module"),
                use: "imports-loader?this=>window"
            }
        ]
    }
};

// jQuery
imports-loader?$=jquery
```

## 9. exports-loader ##

[参考-官网](<https://www.webpackjs.com/loaders/exports-loader/>)

Exports variables from inside the file by appending `exports[...] = ...` statements..

可以使用 [`exports-loader`](https://www.webpackjs.com/loaders/exports-loader/)，将一个全局变量作为一个普通的模块来导出。

**使用**

```js
require("exports-loader?file,parse=helpers.parse!./file.js");
// 向文件源码添加如下代码：
//  exports["file"] = file;
//  exports["parse"] = helpers.parse;

require("exports-loader?file!./file.js");
// 向文件源码添加如下代码：
//  module.exports = file;
```

## 10. vue-style-loader ##

用于打包 `vue` 中代替 `style-loader`

## 11. DllPlugin和DllReferencePlugin ##

 [参考-博客-简书](https://www.jianshu.com/p/6fb08d492b59)

`DLLPlugin` 和 `DLLReferencePlugin` 用某种方法实现了拆分 bundles，同时还大大提升了构建的速度。

**DllPlugin**

This plugin is used in a separate webpack config exclusively to create a dll-only-bundle. It creates a `manifest.json` file, which is used by the [`DllReferencePlugin`](https://webpack.js.org/plugins/dll-plugin#dllreferenceplugin) to map dependencies.

**将此插件与[`output.library`](https://webpack.js.org/configuration/output/#output-library)用于公开（也称为放入全局范围）dll函数的选项相结合**

**DllReferencePlugin**

This plugin is used in the primary webpack config, it references the dll-only-bundle(s) to require pre-built dependencies.

## 12. UglifyjsWebpackPlugin ##

[参考1-官网-webpack](https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin/)， [参考2-博客-中文](<https://blog.csdn.net/u013884068/article/details/83511343>)， [参考3-官网-npm](<https://www.npmjs.com/package/uglifyjs-webpack-plugin>)

### 12.1 `parallel` ###

Type: `Boolean|Number` Default: `false`

Use multi-process parallel running to improve the build speed. Default number of concurrent runs: `os.cpus().length - 1`.

> Parallelization can speedup your build significantly and is therefore **highly recommended**.

`{Boolean}`

**webpack.config.js**

```js
[
  new UglifyJsPlugin({
    parallel: true
  })
]
```

启用并行化。默认并发运行数：`os.cpus().length - 1`。

`{Number}`

**webpack.config.js**

```js
[
  new UglifyJsPlugin({
    parallel: 4
  })
]
```

并发运行数。

> 并行化可以显着加速您的构建，因此**强烈建议**

### 12.2 `cache` ###

Type: `Boolean|String` Default: `false`

Enable file caching. Default path to cache directory: `node_modules/.cache/uglifyjs-webpack-plugin`.

## 13 optimize-css-assets-webpack-plugin ##

一个优化'压缩CSS的WebPack插件

```js
new OptimizeCSSAssetsPlugin({
  cssProcessorOptions: { safe: true, map: buildConfig.productionSourceMap }
})
```

## 14. add-asset-html-webpack-plugin ##

[参考1-官网-NPM](https://www.npmjs.com/package/add-asset-html-webpack-plugin)，[参考2-官网-TAONPM](http://npm.taobao.org/package/add-asset-html-webpack-plugin)

### 14.1 使用 ###

配合 [DllPlugin和DllReferencePlugin](#11. DllPlugin和DllReferencePlugin) 使用。

```js
// This will add a script tag to the HTML generated by html-webpack-plugin
new AddAssetHtmlPlugin({
  filepath: path.resolve(__dirname, '../dll/*.dll.js'),
  publicPath: buildConfig.assetsPublicPath + 'static/js',
  outputPath: '../dist/static/js',
  includeSourcemap: false
}),
```

### 14.2 疑问？ ###

该插件官网没有如下字段，但是不加如下字段的话就需要打包出来的 **dll.js 文件带有相应的 .map 文件，下面字段来源 [博客-简书](https://www.jianshu.com/p/6fb08d492b59)

```bash
includeSourcemap: false
```

## 15. compression-webpack-plugin ##

[参考-官网](<https://www.npmjs.com/package/compression-webpack-plugin>)

### 15.1 `cache` ###

Type: `Boolean|String` Default: `false`

Enable file caching. The default path to cache directory: `node_modules/.cache/compression-webpack-plugin`.

### 15.2 minRatio ###

Type: `Number` Default: `0.8`

Only assets that compress better than this ratio 

## 16. webpack-bundle-analyzer ##

[参考-官网](https://www.npmjs.com/package/webpack-bundle-analyzer)

**使用**

```js
// 动态转入 bundleAnalyzerReport
if (buildConfig.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
```

## 17. html-webpack-plugin ##

[参考-官网](http://npm.taobao.org/package/add-asset-html-webpack-plugin)

### 17.1 **inject** ###

`true` `'head'` `'body'` ` false` Inject all assets into the given `template` or `templateContent`. When passing `true` or `'body'` all javascript resources will be placed at the bottom of the body element. `'head'` will place the scripts in the head element.default is true.

## 18. eslint-loader ##

[参考-npm]()

### 18.1 formatter (default: eslint stylish formatter) ###

Loader accepts a function that will have one argument: an array of eslint messages (object). The function must return the output as a string. You can use official eslint formatters.

**使用**

```js
{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // several examples !
 
          // default value
          formatter: require("eslint/lib/formatters/stylish"),
 
          // community formatter
          formatter: require("eslint-friendly-formatter"),
 
          // custom formatter
          formatter: function(results) {
            // `results` format is available here
            // http://eslint.org/docs/developer-guide/nodejs-api.html#executeonfiles()
 
            // you should return a string
            // DO NOT USE console.*() directly !
            return "OUTPUT";
          }
        }
      }
```

### 18.2 emitError(default: false) ###

Loader will always return errors if this option is set to `true`.

```js
options: {
    emitError: true
}
```

### 18.3 `emitWarning` (default: `false`) ###

## 19. vue-loader 之 cacheDirectory(cache-loader) / cacheIdentifier ##

[参考-官网](<https://vue-loader.vuejs.org/zh/options.html#cachedirectory-cacheidentifier>)

- 类型：`string`
- 默认值：`undefined`

当这两个选项同时被设置时，开启基于文件系统的模板编译缓存 (需要在工程里安装  [cache-loader](#21. cache-loader) )。

```js
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
```

> 在内部，`vue-loader` 和 [cache-loader](#21. cache-loader) 之间的交互使用了 [loader 的内联 import 语法](https://webpack.js.org/concepts/loaders/#inline)，`!`将会被认为是不同 loaders 之间的分隔符，所以请确保你的 `cacheDirectory` 路径中不包含 `!`。
>
> ***vue-loader 里面生成的 cache文件 和  其它地方生成的cache 文件不共享***

## 20. postcss ##

### 20.1 postcss-import ###

[参考-npm](<https://www.npmjs.com/package/postcss-import>)

```scss
/* can consume `node_modules`, `web_modules` or local modules */
@import "cssrecipes-defaults"; /* == @import "../node_modules/cssrecipes-defaults/index.css"; */
@import "normalize.css"; /* == @import "../node_modules/normalize.css/normalize.css"; */
 
@import "foo.css"; /* relative to css/ according to `from` option above */
 
@import "bar.css" (min-width: 25em);
 
body {
  background: black;
}
```

will give you:

```scss
/* 
... content of ../node_modules/cssrecipes-defaults/index.css 
*/

/*
... content of ../node_modules/normalize.css/normalize.css */
 
/*
... content of css/foo.css 
*/
 
@media (min-width: 25em) {
/* ... content of css/bar.css */
}
 
body {
  background: black;
}
```

### 20.2 postcss-url ###

[参考-npm](https://www.npmjs.com/package/postcss-url)

[PostCSS](https://github.com/postcss/postcss) plugin to rebase, inline or copy on url().

## 21. cache-loader ##

[参考-腾讯云社区](<https://cloud.tencent.com/developer/section/1477510>)

[在vue-loader中使用](#19. vue-loader 之 cacheDirectory(cache-loader) / cacheIdentifier)

> 请注意，**保存读取和保存缓存文件会产生开销**，因此**只能使用此加载程序来缓存昂贵的加载程序。**

在一些性能开销较大的 loader 之前添加此 loader，以将结果缓存到磁盘里。

```js
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
```

## 22. babel ##

> **plugin: babel的插件，在6.x版本之后babel必需要配合插件来进行工作**
>
> **preset: babel插件集合的预设，包含某一部分的插件plugin**

### 22.1 Polyfill ###

[参考-官网](<https://www.babeljs.cn/docs/usage/polyfill/>)

它会仿效一个完整的 ES2015+ 环境，并意图运行于一个应用中而不是一个库/工具。这个 polyfill 会在使用 `babel-node` 时自动加载。

这意味着你可以使用新的内置对象比如 `Promise` 或者 `WeakMap`, 静态方法比如 `Array.from` 或者 `Object.assign`, 实例方法比如 `Array.prototype.includes` 和生成器函数（提供给你使用 [regenerator](https://www.babeljs.cn/docs/plugins/transform-regenerator/) 插件）。为了达到这一点， polyfill 添加到了全局范围，就像原生类型比如 `String` 一样。

在 `webpack.config.js` 中，将 `babel-polyfill` 加到你的 entry 数组中：

```js
module.exports = {
  entry: ["babel-polyfill", "./app/js"]
};
```

### 22.2 babel-core ###

Babel 的核心依赖包

### 22.3 babel-preset-stage-2 和 babel-preset-env ###

[参考-博客](https://www.cnblogs.com/zhaozhipeng/p/8267741.html)

babel-preset-es2015: 可以将es2015即es6的js代码编译为es5

babel-preset-es2016: 可以将es2016即es7的js代码编译为es6

babel-preset-es2017: 可以将es2017即es8的js代码编译为es7

babel-preset-stage-x: 可以将处于某一阶段的js语法编译为正式版本的js代码

stage-X: 指处于某一阶段的js语言提案。

- 提案共分为五个阶段：
- *stage-0: 稻草人-只是一个大胆的想法*
- *stage-1: 提案-初步尝试*
- *stage-2: 初稿-完成初步规范*
- *stage-3: 候选-完成规范和浏览器初步实现*
- *stage-4: 完成-将被添加到下一年发布*

 

**当前 babel 推荐使用 babel-preset-env 替代 babel-preset-es2015 和 babel-preset-es2016 以及 babel-preset-es2017 ,env的支持范围更广，包含es2015 es2016 es2017的所有语法编译，并且它可以根据项目运行平台的支持情况自行选择编译版本。**

使用方法： '.babelrc' 中 'es2015' 改为 'env'，

```js
"presets": ["env", "stage-2"]
```

### 22.4 注意 ###

**插件中每个访问者都有排序问题。**

这意味着如果两次转译都访问相同的”程序”节点，则转译将按照 plugin 或 preset 的规则进行排序然后执行。

- Plugin 会运行在 Preset 之前。
- Plugin 会从第一个开始顺序执行。ordering is first to last.
- Preset 的顺序则刚好相反(从最后一个逆序执行)。



## 23. 其他 ##

### 23.1 happypack 和 thread-loader ###

[***happypack-参考-npm***](https://www.npmjs.com/package/happypack)，[***thread-loader-参考-webpack***](<https://www.webpackjs.com/loaders/thread-loader/>) 

***HappyPack*** 通过[并行](https://www.npmjs.com/package/happypack#how-it-works)转换文件使得初始webpack构建更快。

***thread-loader*** 可以将非常消耗资源的 loaders 转存到 worker pool 中。

### 23.2 friendly-errors-webpack-plugin 和 node-notifier ###

devServer.quit = true；

弹窗提示

### 23.3. rimraf ###

可以实现文件的删除。

> 替代了 CleanWebpackPlugin 的作用

```js
rm(path.join(...), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    if (err) throw err
    ...
  })
})
```

### 23.4 shelljs ###

nodejs 的shell 命令模块

### 23.5 Vue-template-compiler ###

[博客-Vue-template-compiler 和vue-loader 的关系是怎么样的?马上就要合二为一了？](https://segmentfault.com/q/1010000011811513)

You will only need it if you are writing build tools with very specific needs. In most cases you should be using vue- loader or vueify instead, both of which use this package internally.

[VUE社区-安装了vue-loader之后，还需要vue-template-compiler吗](https://forum.vuejs.org/t/vue-loader-vue-template-compiler/49497)

但凡用了 Vue 模板就需要这个编译器，但 vue-loader 并没有显式依赖 vue-template-compiler（不清楚确切原因，猜测单纯是为了解耦，因为理论上 vue-loader 并不关心模板编译的过程），而是假设用户自行解决了这个依赖，如果你没安装就报错了。

> Vue-loader 依赖 Vue-template-compiler 
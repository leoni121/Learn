1. 完成下面函数内容，		:**

```js
let amdwrap =  function (moduleName, commonJSModuleText, requires) {
    //your code here…
};
```

测试用例：

```js
let ret = amdwrap('moduleA','module.exports={name:"Tmall"}',['depA','depB'])
```

期望输出：

```js
define('moduleA',['depA','depB'],function (require, exports, module) {
	module.exports={name:"Tmall"}
});
```

**答案**

```js
let amdwrap =  function (moduleName, commonJSModuleText, requires) {
    module.require = requires;
    eval(commonJSModuleText);
    module.name = moduleName;
};
```

2. 语义化版本控制规范

3. 以下对于git说法正确的是

   * git是由github创造的代码管理工
   * git和svn实现的原理是一样的
   * 从git原理设计上讲，执行 git pull 和先执行git fetch再执行git merge效果是一样的
   * git将代码提交到远程仓库的命令是git commit
   * git rm只会将文件从git提交记录中删除，不会删除磁盘上的物理文件
   * git push -f将会重新提交当前commit节点，不会重写历史commit

4. flutter　等新技术（选正确）

   * Flutter 通过自建渲染方案来解决 Android 与 iOS 渲染差异问题
   * React Native 与 Weex 都是使用 JavaScript 通过操作 Virtual-DOM 来改变视图的
   * Cordova 支持通过 JavaScript 来调用原生 API。例如，照相机、地理位置等
   * 当注册 Service Worker 的页面被刷新或者关闭时，Service Worker 也立即停止执行
   * Flutter、React Native 都是默认使用 JavaScript  作为驱动语言
   * React Native 中 JavaScript 和 Native 渲染引擎之间通信是异步

5. xhr（选择）

   | 值   | 状态               | 描述                                                         |
   | ---- | ------------------ | ------------------------------------------------------------ |
   | `0`  | `UNSENT`           | `XHR`被创建，但尚未调用 open() 方法。                        |
   | `1`  | `OPENED`           | `open()` 方法已经被调用，`send` 方法还没有被调用。在这个状态中，可以通过  [setRequestHeader()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader) 方法来设置请求的头部， 可以调用 [send()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send) 方法来发起请求。 |
   | `2`  | `HEADERS_RECEIVED` | `send()` 方法已经被调用，，响应头也已经被接收。              |
   | `3`  | `LOADING`          | 响应体部分正在被接收。`responseText` 属性已经包含部分数据。  |
   | `4`  | `DONE`             | 请求操作已经完成。这意味着数据传输已经彻底完成或失败。全部数据都已经解析为客户端可用的格式，解析已经完成。 |

   * XHR Level 1 标准支持发送跨域请求

     [XMLHttpRequest](<https://www.jianshu.com/p/b5e62ec9bd92?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation>)

   * xhr.send() 方法执行后，会马上返回数据结果

   * xhr.setRequestHeader() 设置请求头方法可以在 xhr.open 方法执行之前调用

   * 当 xhr.send() 方法调用之后，xhr.readyState 的状态值为 2

   * 当 xhr.readyState 状态值为 3 时，这时通过 xhr.response 有可能获取到响应数据

   * 当 xhr.send() 方法调用之后再设置 xhr.setRequestHeader() 将无效

6. defer　async

   [[defer和async的区别](https://segmentfault.com/q/1010000000640869)]

   * 加了async属性的脚本的加载和执行不会阻塞页面的渲染
   * 加了defer属性的脚本的加载和执行不会阻塞页面的渲染
   * 加了async属性的脚本加载完成后会立马执行
   * 加了defer属性的脚本加载完成后会在DOMContentLoaded事件前执行
   * 所有加了defer属性的脚本加载完成后不保证执行顺序

7. class 属性命名
8. nodejs 流对象
   * 当nodejs程序require('./someModule')时，首先尝试加载 .js 扩展名的文件，如果没有，试图按照路径查找 .json 扩展名的文件，如果还是没有，就按照路径查找 .node 扩展名的c++模
   * nodejs事件循环中，setImmediate的优先级比setTimeout的高
   * nodejs不擅长cpu密集型的操作是因为nodejs是单线程的
   * nodejs中path模块，执行path.join('./path', '../image', 'file', './123.jpg')的结果为“image/file/123.jpg”
   * nodejs中path模块，执行path.resolve('./path', '../image', 'file', './123.jpg')的结果为“image/file/123.jp
   * nodejs中path模块，执行path.normalize('./path/../image/file/./123.jpg')的结果为TypeError（'image/file/123.jpg'）

9. 面向对象语言中普遍存在的接口（interface）是什么，与类（class）有什么不同？为什么javascript中至今没有interface这个概念？

   [类与接口的区别和详解](https://www.cnblogs.com/munetiey/articles/6508605.html)
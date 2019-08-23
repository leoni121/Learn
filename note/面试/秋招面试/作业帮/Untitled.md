> 面试官人都非常好！
>
> 改进：计算机网络不好！多思考具体实现。

## **试题**

1. 深克隆

   ```js
   // 错误记录
   // 1. "[Object object]"      => "[object Object]"
   // 
   // 2. else if { res = obj; } => else { res = obj }
   // 
   // 3. getType 情况不完善
   // function getType(arg) {
   //      "[Object object]": "object",
   //      "[Object array]": "array",
   //    },
   //    type = Object.prototype.toString;
   //  return obj[type.call(arg)];
   // }
   // 
   // 4. Obejct.getOwnProperty => Object.getOwnPropertyNames / Object.keys
   // 
   // 5. oldStack.indexof => oldStack.indexOf
   // 
   // 6. res[key] = deepClone(obj[key]); => res[key] = clone(obj[key]);
   
   function getType(arg) {
     let obj = {
         "[object object]": "object",
         "[object array]": "array",
       },
       type = Object.prototype.toString;
     return obj[type.call(arg)];
   }
   
   function deepClone(obj) {
     let oldStack = [],
       newStack = [];
   
       return clone(obj ,oldStack, newStack);
   }
   
   function clone(obj, oldStack, newStack) {
     let res, pos = oldStack.indexOf(obj);
     if( pos === -1) {
       oldStack.push(obj);
       if(getType(obj) === 'object') {
         res = {};
         let keys = Object.keys(obj);
         for(let key of keys) {
           res[key] = clone(obj[key], oldStack, newStack);
         }
       } else if(getType(obj) === "array") {
         res = [];
         for(let idx in obj) {
           res[idx] = clone(obj[idx], oldStack, newStack);
         }
       } else {
         res = obj;
       }
       newStack.push(res);
     } else {
       res = newStack[pos];
     }
   
     return res;
   }
   ```

   * 使用Object.keys()遍历 **可枚举属性**(不含Symbol属性).
   * 使用`Object.getOwnPropertyNames(obj)`遍历 返回一个数组,包含对象自身的所有属性(不含Symbol属性,但是包括不可枚举属性).
   * 使用`for..in..`遍历 循环遍历对象自身的和继承的可枚举属性(不含Symbol属性).
   * 使用`Reflect.ownKeys(obj)`遍历 返回一个数组,包含对象**自身的所有属性**,不管属性名是Symbol或字符串,也不管是否可枚举，不会遍历`__proto__`。

2. session/cookies/localSotrge/sessionStorage，cookie 过期

   [你真的了解 Cookie 和 Session 吗](https://juejin.im/post/5cd9037ee51d456e5c5babca)

   [Cookie与Session的区别-总结很好的文章](https://www.cnblogs.com/xxcn/p/4408679.html)

   数据、隐私、服务器压力、浏览器支持、跨域支持

3. 浏览器缓存，Pragma（max-age 秒）

   [彻底弄懂强缓存与协商缓存](https://www.jianshu.com/p/9c95db596df5)

4. 跨域，jsonp 原理

5. 闭包，为什么不会释放资源

6. 层叠样式表，不就是CSS吗？层叠上下文

   [**层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)**

   > - [层叠上下文 Stacking Context](https://www.bbsmax.com/A/n2d9XnMv5D/)

   **层叠上下文**是HTML元素的三维概念，这些HTML元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的z轴上延伸，HTML元素依据其自身属性按照优先级顺序占用层叠上下文的空间。

   层叠上下文的层级是 HTML 元素层级的一个层级，因为只有某些元素才会创建层叠上下文。可以这样说，没有创建自己的层叠上下文的元素 将被父层叠上下文包含。

   **[层叠样式表](https://developer.mozilla.org/zh-CN/docs/Web/CSS)**

   是一种 [样式表](https://developer.mozilla.org/zh-CN/docs/DOM/stylesheet) 语言，用来描述 [HTML](https://developer.mozilla.org/zh-CN/docs/HTML)或 [XML](https://developer.mozilla.org/zh-CN/docs/XML_介绍)（包括如 [SVG](https://developer.mozilla.org/zh-CN/docs/SVG)、[MathML](https://developer.mozilla.org/zh-CN/docs/Web/MathML)、[XHTML](https://developer.mozilla.org/zh-CN/docs/XHTML) 之类的 XML 分支语言）文档的呈现。CSS 描述了在屏幕、纸质、音频等其它媒体上的元素应该如何被渲染的问题。

7. BFC

8. flex，属性居中

9. 继承实现，写组合继承

10. 带 context 的函数柯里化

11. 盒模型

    ```js
    var length = 10;
    function fn(){
    	console.log(this.length)
    }
    var obj = {
    	length:5,
    	method:function(fn){
      	fn();
      	arguments[0]();
    	}
    }
    obj.method(fn)
    
    // 1. 浏览器 => 10  1
    // 2. node => undefined 1
    ```

12. 

    ```js
    var obj = {}, b = {a:123}, c = {b:123}
    obj[b] = 123;
    console.log(obj[b]) 
    // 123
    ```

13. 为什么学前端。

14. 在蘑菇街实习有点养老，作业帮大小周、加班重。

15. 写代码：220 个同学上12个台阶，是否有两个同学的有相同的行走路径，每个同学一次最多走两个台阶。

    > **写完之后多检查**
    >
    > [以斐波那契数列为例分析递归算法的时间复杂度和空间复杂度](https://blog.csdn.net/superwangxinrui/article/details/79626870)

    

    ```js
    const count = 220;
    
    // f(n) = f(n-1) + f(n-2);
    // 0, 1, 2, 3, 4 .... n
    function check(n) {
      if (n < 2) return 1;
      let [pre, cur] = [1, 1];
      for (let i = 2; i <= n; i++) {
        [pre, cur] = [cur, pre + cur];
      }
      return cur;
    }
    
    function _check(n) {
      if (n < 2) return 1;
      return _check(n-1) + _check(n-2);
    }
    console.log(check(12) >= count)
    ```

    

16. 写代码：字符串数组按长度排序、相同长度用ASSIC 码排序。（使用的JS 的sort）。

    ```js
    let arr = ['aa', 'bc', 'fg', 'ac', 'acd', 'a']
    
    function sort (arr) {
      let length = arr.length;
      if (length <= 1) return arr;
      return arr.sort((pre, cur) => {
        if (pre.length === cur.length) {
           let _lenght = pre.length;
          for (let i = 0; i < _lenght; i++) {
            console.log(pre, cur)
            let preAscii = pre[i].charCodeAt(0),
              curAscii = cur[i].charCodeAt(0);
            if ( preAscii !== curAscii ) {
              return preAscii - curAscii;
            }
          }
        } else {
          return pre.length - cur.length;
        }
      })
    }
    
    console.log(sort(arr));
    ```

    

17. 获取ASSIC，sort 用法。

18. Sort 底层原理，快速排序和插入排序的时间复杂度。当数组在什么长度的时候使用插入排序或者快速排序。

    > [深入浅出 JavaScript 的Array.prototype.sort 排序算法](https://hufangyun.com/2017/sort-array/)

19. 三个握手，非常具体的内容（面试官理解错了我的意思GG！！！ ACK ack, \！）。

20. https、属于那一层，为什么需要知道对方的加密算法（答：“不知道对方加密方法，就没办法了啊！！！ 嘤嘤嘤！！！！”。面试官：“其实我想问的就是不同浏览器的加密算法实现不同，比如像ie6”）。

21. Https 作用

22. 浏览器输入URL过程（给出具体的URL）。

23. ARP、路由器怎么知道IP、MAC的。

24. 首页优化、空白屏时间过长。

25. 上游发送电频，下游接收，1分钟最多14个 高电频，大于14个电频下游接收器会烧坏，1秒钟一个电频。设置过滤高电频，在一分钟之内少于14个。

    就是连续的101010101010 这样子的类型。

    （以为要编码、结果是过滤。），面试官计数过滤，当一分钟之内大于14个是过滤高电频。

    现在回答：每次接受的第一个都不能是高电频。

26. 操作系统学的window、linux 还是bulabula。。。、内存页调度算法。

27. LRU（Least Recently Used，最近最少使用算法），给了一个数字系列4，7，0，7，1，0，1，2，1，2，6，窗口大小5，求最后在内存中的序列。

    > [LRU](https://baike.baidu.com/item/LRU/1269842?fr=aladdin) ———— 470、407、4071、4710、47102、47021、47012、70126

28. 自我介绍

29. 蘑菇街实习经历

30. 遇到的难点，解决方式

31. 觉得蘑菇街怎么样

32. 蘑菇街没有转正吗？为什么不转正

33. 目前投了那些公司，秋招进程

34. 投递公司标准、选择公司的标准

35. 北京那么多公司为什么选择作业帮

36. 期待工资

37. 来北京你觉得有哪些挑战

38. 能来实习对吧，最好能来



## **准备**

1. 对作业帮的了解：
   * 作业帮、中小学生、学习辅导服务、户量突破3亿、中小学在线教育领军品牌。
   * 拍照搜题、作业帮一课、一对一辅导、古文助手、作文搜索等。
   * 2015年正式独立运营，A轮融资，2018年完成了3.5 亿美元 D 轮融资。
2. .为什么选择作业帮
   * 我十分看好贵公司所在的行业，这个行业的发展前景是非常大的。
   * 从很多地方了解到作业帮公司的技术氛围很好，包括牛客网上面都有各种牛客网和其他公式的比较。
   * 作业帮的薪资对于应届生来说也是可以接受的。
   * 作业帮在北京，其实很想去北京看一看，毕竟是中国的首都嘛！
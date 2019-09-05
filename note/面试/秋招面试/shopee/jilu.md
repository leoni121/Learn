> 面试官人还不错，全程没有问计算机相关的东西，面试官很有深度（我看出了，大佬）

1. 自我介绍

2. 实习开发流程，学校项目

3. 深克隆

   ```js
   // deepCopy
   // object,   array,   dom,  native
   
   //　我的写法
   function getType(arg) {
     if(arg instanceof Element) {
       return "dom";
     }
     const obj = {
       "[Object object]": "object",
       "[Object array]": "array",
     }
     return obj[Object.prototype.toString.call(arg)] || "native";
   }
   
   function deepCopy(arg) {
       let res = null,
           visitedQueue = [],
           createQueue = [];
     
       if(getType(arg) === "dom") {
           return document.cloneElement(arg);
       } else if(getTYpe(arg) === "native") {
           return arg;
       }
   
       return copy(arg, visitedQueue, createQueue);
   }
   
   function copy(arg, visitedQueue, createQueue) {
       let res,
           visitedIdx;
     visitedIdx = visitedQueue.indexOf(arg);
     // 访问过
       if ( visitedIdx !== -1) {
         res = createQueue[visitedIdx]; // 获取对应的 createQueue 中的值
       }
       // 没访问过
       else {
         if(getType(arg) === "array") {
             res = [];
           	visitedQueue.push(target);
             createQueue.push(res);
             for(let idx of arg) {
                 res[idx] = copy(arg[idx]);
             }
         } else if(getType(arg) === "object") {
              res = {};
              visitedQueue.push(target);
              createQueue.push(res);
              for(let key in arg) {
                 res[key] = copy(arg[key]);
             }
         } else if(getType(arg) === "dom") {
             return document.cloneElement(arg);
         } else if(getTYpe(arg) === "native") {
             return arg;
         }
       }
       return res;
   }
   ```

4. 二分查找 递归和非递归

5. 事件循环，说出输出结果

   ```js
   async function a() {
       console.log('await before')
       await 10
       console.log('await after')
   }
   console.log('start')
   setTimeout(() => {
       console.log('timeout')
   }, 0)
   new Promise(() => {
       console.log('promise')
   }).then(() => {
       console.log('then')
   })
   a()
   console.log('end')
   
   // 运行结果：start ,promise ,awiait before ,end,then,awiait after, timeout（waiat　没有想起是微任务还是宏任务）
   ```

   

6. 快速排序和归并排序（时间复杂度，空间复杂度），讲一讲

   [归并排序的空间复杂度为什么是O（n）？快速排序的空间复杂度为什么是O（log2n）？](<https://blog.csdn.net/taotao12312/article/details/69664351?utm_source=blogkpcl3>)

7. float子元素能不能撑起父元素高度

8. BFC

9. typescript（我：ｌｉｋｅ　ｊａｖａ　。　面试官：强类型，很多大公司都在用，了解一下）

10. babel

11. webpack, rollup　之外其他的打包工具

12. 有没有想过写一个webpack　的插件

13. service work（没有想起　ｐｗａ）, webaessably, flutter 等新技术

14. 前端了解什么框架

15. vue v-model　, vue 3.0 新技术 (emit)，双向绑定原理

16. 前端监控(iframe　这种一般没有公司敢做), script标签上面添加属性（不是我们的属性就是运营商添加的），Content-Security-Policy，　比较hash　（我真的菜，这都不敢说，面试官说的思路我都知道）‘

17. 笔试题还好（50 多，大部分不超过60）

18. Symbol　（作用，用处）

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

2. session/cookies/localSotrge/sessionStorage，cookie 过期

3. 浏览器缓存，Pragma

4. 跨域，jsonp 原理

5. 闭包，为什么不会释放资源

6. 层叠样式表，不就是CSS吗？

7. BFC

8. flex，属性居中

9. 继承实现，写组合继承

10. 带 context 的函数柯里化

11. 盒模型
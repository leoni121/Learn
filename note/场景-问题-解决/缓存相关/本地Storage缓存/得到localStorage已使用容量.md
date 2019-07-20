```js
(function(){
    if(!window.localStorage) {
        console.log('浏览器不支持localStorage');
    }
    var size = 0;
    for(item in window.localStorage) {
        if(window.localStorage.hasOwnProperty(item)) {
            size += window.localStorage.getItem(item).length;
        }
    }
    console.log('当前localStorage已使用容量为' + (size / 1024).toFixed(2) + 'KB');
})()
```

[转：判断一个字符串有多少个字节(js、.net 、Oracle)](https://www.cnblogs.com/zhangweijia/articles/2801391.html)

```js
//js方法
new function(s)
{
    if(!arguments.length||!s) return null;
    if(""==s) return 0;
    var l=0;
    for(var i=0;i<s.length;i++)
    {
        if(s.charCodeAt(i)>255) l+=2;
        else l++;
    }
    alert(l);
}("hello你好!");
```


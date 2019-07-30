```js
/**
 * @Author nzq
 * @Date 2019/2/24
 * @Description:
 * @param {[type]} key   [键名]
 * @param {[type]} value [键值]
 * @param {[type]} days  [保存的时间（天）] 
 * @Return: 
 */

(function () {
  let getItem = localStorage.getItem.bind(localStorage)
    ,setItem = localStorage.setItem.bind(localStorage);

  localStorage.setItem = function (key, value, expires = 7 * 24 * 60 * 60 * 1000) {
    return setItem(key, JSON.stringify({
      value,
      expires: +new Date() + expires
    }));
  }

  localStorage.getItem = function (key) {
    let obj = JSON.parse(getItem(key))
      ,value;
    if (obj.expires < +new Date()) {
      alert('过期');
      value = '';
    } else {
      value = obj.value;
    }
    return value
  }
})()

```



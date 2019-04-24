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

_storage = {
  setCookie: function (key, value, days) {
    // 设置过期原则
    if (!value) {
      localStorage.removeItem(key)
    } else {
      var Days = days || 7; // 默认保留7天
      var exp = new Date();
      localStorage[key] = JSON.stringify({
        value,
        expires: exp.getTime() + Days * 24 * 60 * 60 * 1000
      })
    }
  },
  getCookie: function (name) {
    try {
      let o = JSON.parse(localStorage[name])
      if (!o || o.expires < Date.now()) {
        return null
      } else {
        return o.value
      }
    } catch (e) {
      // 兼容其他localstorage
      console.log(e)
      return localStorage[name]
    } finally {
    }
  },
}
```



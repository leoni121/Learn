/**
 * @Author nzq
 * @Date 2019-07-29
 * @Description:
 * @Param:
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

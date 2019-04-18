/**
 * @Author nzq
 * @Date 2019/4/18
 * @Description: 防抖
 * @Param:
 * @Return:
 */
function debounce(fn, delay = 50) {
  let timer = null;
  return function (...arg) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn(...arg);
    }, delay)
  }
}


/**
 * @Author nzq
 * @Date 2019/4/18
 * @Description: 节流
 * @Param:
 * @Return:
 */

function throttle(fn, delay=200) {
  let timer = null
    ,last = 0
    ,now = 0;

  return function (...arg) {
    now = +new Date()
    if (last && now - last < delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn(...arg);
      }, delay)
    }else {
      last = +new Date();
      fn(...arg);
    }
  }
}

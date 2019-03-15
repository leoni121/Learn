const endTime = '';

let getServerTime = function (cb) {
  let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  let deviceTime = Date.parse(new Date());

  xhr.open('get', '/', true);
  /*xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let serverTime = xhr.responseText.serverTime;
      cb(endTime, deviceTime, serverTime);
    }
  };*/
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 3) {
      let serverTime = xhr.getResponseHeader('Date');
      cb(endTime, deviceTime, serverTime);
    }
  };
  xhr.send(null);
}

/**
 * @Author nzq
 * @Date 2019/3/15
 * @Description: 参考：（阿里）https://gaohaoyang.github.io/2016/11/25/how-to-write-a-count-down/；（方法）https://www.cnblogs.com/xiaochongchong/p/5982004.html ; （请求）https://www.cnblogs.com/xiaochongchong/p/5982004.html
 * @param  {Number} endTime    截止时间
 * @param  {Number} deviceTime 设备时间
 * @param  {Number} serverTime 服务端时间
 * @return {Object}            剩余时间对象
 */

let getRemainTime = (endTime, deviceTime, serverTime) => {
  // ( Date.parse(new Date()) - deviceTime ) 是浏览器接收到请求后到处理时的时间差
  // 当前的实际时间 比服务器传回来的时间要短
  let t = endTime - serverTime - ( Date.parse(new Date()) - deviceTime );
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  console.log(seconds);
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  }
}

//设置定时器
let intervalTimer = setInterval(() => {
  getServerTime((endTime, deviceTime, serverTime) => {
    // 得到剩余时间
    let remainTime = getRemainTime(endTime, deviceTime, serverTime)

    // 倒计时到两个小时内
    if (remainTime.total <= 7200000 && remainTime.total > 0) {
      // do something

      //倒计时结束
    } else if (remainTime.total <= 0) {
      clearInterval(intervalTimer);
      // do something
    }
  })
}, 1000)

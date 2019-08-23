## **yi、**

> [JavaScript 倒计时踩坑集锦](https://juejin.im/post/5bcd89d5e51d4579bb1c5e22) —— main

1. setTimeout 内部修正

   ```js
   let countdown = 100000; // ms 服务器返回的倒计时剩余时间
   let countIndex = 1; // 倒计时任务执行次数
   const timeout = 1000; // 触发倒计时任务的时间间隙
   const startTime = new Date().getTime();
   
   startCountdown(timeout);
   
   function startCountdown(interval) {
     setTimeout(() => {
       const endTime = new Date().getTime();
       // 偏差值
       const deviation = endTime - (startTime + countIndex * timeout);
       console.log(`${countIndex}: 偏差${deviation}ms`);
       
       countIndex++;
       
       // 下一次倒计时
       startCountdown(timeout - deviation);
     }, interval);
   }
   ```

2. 浏览器隐藏、可见性修正

   - window.focus + window.blur
   - [visibilitychange 事件](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FPage_Visibility_API)

3. 获取服务器时间修正

   ```js
   let getServerTime = function (cb) {
     let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
     let deviceTime = Date.parse(new Date());
   
     xhr.open('get', '/', true);
     xhr.onreadystatechange = function() {
       if (xhr.readyState === 3) {
         let serverTime = xhr.getResponseHeader('Date');
         cb(endTime, deviceTime, serverTime);
       }
     };
     xhr.send(null);
   }
   
   
   let t = endTime - serverTime - ( Date.parse(new Date()) - deviceTime );
   ```

## er、


```js
/**

- @author xiaojue
- @date 20160420
- [你真的知道怎么用javascript来写一个倒计时吗 ?](https://github.com/gomeplusFED/blog/blob/master/2016-04/do-you-really-understand-how-to-write-a-countdown-by-javascript.md)
- @fileoverview 倒计时想太多版
  */
  (function() {

  // 根据 delay 创建Timer,
  function timer(delay) {
    this._queue = [];
    this.stop = false;
    this._createTimer(delay);
  }

  timer.prototype = {
    constructor: timer,
    _createTimer: function(delay) {
      var self = this;
      var first = true;
      (function() {
        var s = new Date();
        for (var i = 0; i < self._queue.length; i++) {
          self._queue[i]();
        }
        if (!self.stop) {
          var cost = new Date() - s;
          // 如果阻塞大于延迟时间，那么应该下次递归直接执行，而我这里还是会延迟1s，只是相对会减少误差。
          delay = first ? delay : ((cost > delay) ? cost - delay : delay);
          setTimeout(arguments.callee, delay);
        }
      })();
      first = false;
    },
    add: function(cb) {
      this._queue.push(cb);
      this.stop = false;
      return this._queue.length - 1;
    },
    remove: function(index) {
      this._queue.splice(index, 1);
      if(!this._queue.length){
        this.stop = true;
      }
    }
  };

  // 存放不同 delayTime 的timer
  function TimePool(){
    this._pool = {};
  }

  TimePool.prototype = {
    constructor:TimePool,
    getTimer:function(delayTime){
      var t = this._pool[delayTime];
      return t ? t : (this._pool[delayTime] = new timer(delayTime));
    },
    removeTimer:function(delayTime){
      if(this._pool[delayTime]){
        delete this._pool[delayTime];
      }
    }
  };

  var delayTime = 1000;
  var msInterval = new TimePool().getTimer(delayTime);

  function countDown(config) {
    var defaultOptions = {
      fixNow: 3 * 1000,
      fixNowDate: false,
      now: new Date().valueOf(),
      template: '{d}:{h}:{m}:{s}',
      render: function(outstring) {
        console.log(outstring);
      },
      end: function() {
        console.log('the end!');
      },
      endTime: new Date().valueOf() + 5 * 1000 * 60
    };
    for (var i in defaultOptions) {
      if (defaultOptions.hasOwnProperty(i)) {
        this[i] = config[i] || defaultOptions[i];
      }
    }
    this.init();
  }

  countDown.prototype = {
    constructor: countDown,
    init: function() {
      var self = this;
      if (this.fixNowDate) {
        var fix = new timer(this.fixNow);
        fix.add(function() {
          self.getNowTime(function(now) {
            self.now = now;
          });
        });
      }
      var index = msInterval.add(function() {
        self.now += delayTime;
        if (self.now >= self.endTime) {
          msInterval.remove(index);
          self.end();
        } else {
          self.render(self.getOutString());
        }
      });
    },
    getBetween: function() {
      return _formatTime(this.endTime - this.now);
    },
    getOutString: function() {
      var between = this.getBetween();
      return this.template.replace(/{(\w*)}/g, function(m, key) {
        return between.hasOwnProperty(key) ? between[key] : "";
      });
    },
    getNowTime: function(cb) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', '/', true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 3) {
          var now = xhr.getResponseHeader('Date');
          cb(new Date(now).valueOf());
          xhr.abort();
        }
      };
      xhr.send(null);
    }
  };

  function _cover(num) {
    var n = parseInt(num, 10);
    return n < 10 ? '0' + n : n;
  }

  function _formatTime(ms) {
    var s = ms / 1000,
      m = s / 60;
    return {
      d: _cover(m / 60 / 24),
      h: _cover(m / 60 % 24),
      m: _cover(m % 60),
      s: _cover(s % 60)
    };
  }

  var now = Date.now();

  new countDown({});
  new countDown({
    endTime: now + 8 * 1000
  });

})();
```


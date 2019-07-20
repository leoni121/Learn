/**
 * @Author nzq
 * @Date 2019/5/28
 * @Description:
 * @Param:
 * @Return:
 */

let eventUid = 0;
class EventEmitter {
  constructor () {
    this.eventList = {};
  }
  on(event, cb) {
    if (!this.eventList[event]) {
      this.eventList[event] = [];
    }
    this.eventList[event].push({
      token: eventUid++,
      callback: cb,
    })
  }
  emit(event, ...args) {
    let cbs = this.eventList[event];
    if (cbs) {
      for (let idx = 0, len = cbs.length; idx < len; idx++) {
        cbs[idx].callback(...args);
      }
    }
  }
  remove(event, token) {
    if (!token) {
      this.eventList[event] = undefined;
    } else {
      let cbs = this.eventList[event];
      for (let idx = 0, len = cbs.length; idx < len; idx++) {
        if (cbs[idx].token === token) {
          cbs.splice(idx, 1);
          return ;
        }
      }
    }
  }
}

let e = new EventEmitter();
e.on('nzq', function () {
  console.log('nzq');
})
e.on('nzq', function () {
  console.log('nzq2');
})
e.on('nzq', function () {
  console.log('nzq3');
})
e.on('nzq', function () {
  console.log('nzq4');
})
e.on('wx', function () {
  console.log('fsdfdfd');
})
e.emit('nzq');
e.remove('nzq', 2);
e.emit('wx');
console.log(e.eventList);

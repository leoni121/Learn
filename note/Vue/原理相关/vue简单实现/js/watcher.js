///////////////////////////////////////////// Watcher

/**
 * @author NZQ
 * @date 2018/12/24
 * @Description : 容纳订阅者的消息订阅器
 * @param : sub => watcher
 */

class Dep {
  constructor () {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() { // 数据改变时 通知每一个watcher
    this.subs.forEach((sub) => {
      sub.update(); // 执行watcher 的更新方法
    })
  }
}


/**
 * @author NZQ
 * @date 2018/12/24
 * @Description : 订阅者
 */
class Watcher {
  // data-数据 exp-数据属性名 callback-回调函数
  constructor (vm, exp, callback) {
    this.callback = callback;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get(); // 初始化时执行get，赋予初始值，缓存可以和新的比较
  }

  // 这个方法由订阅器触发（当数据改变的时候，会触发dep.notify，dep.notify又会触发（触发已经订阅的watcher）该方法）
  update() {
    this.run()
  }
  run() {
    let value = this.vm.data[this.exp] // 改变后的值
      ,oldVal = this.value; // 初始值
    if (value !== oldVal) {
      this.value = value;
      console.log('调用了 watcher', value)
      // :: 绑定符
      this.callback.call(this.vm, value, oldVal); // 处理函数
    }
  }
  get() {
    Dep.target = this; //缓存自己 -- watcher,
    let value = this.vm.data[this.exp]; // 执行get 通过这一步判断Dep里面有没有当前的
    Dep.target = null;
    return value;
  }
}

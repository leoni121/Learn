///////////////////////////////////////////// Observer
/**
 * @author NZQ
 * @data 2018/12/24
 * @Description : 实现数据监听
 */
function defineReactive(data, key, val) {
  let dep = new Dep(); // 每个属性一个消息管理器
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    // get是没有对应属性就添加
    get() {
      // 此处Dep 主要是利用先前的target
      if (Dep.target) { // 判断是否需要添加订阅者
        dep.addSub(Dep.target); // 在这里添加一个订阅者到消息订阅器
      }
      return val
    },
    set(newVal) {
      if (val === newVal) {
        return ;
      }
      val = newVal;
      dep.notify(); //Observer => Dep => Watcher
    }
  })
  console.log(dep);
  observe(val)
}
/**
 * @author NZQ
 * @data 2018/12/24
 * @Description : 数据监听器主体
 */
function observe(data) {
  if (data && typeof data === 'object') {
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key])
    })
  }
}

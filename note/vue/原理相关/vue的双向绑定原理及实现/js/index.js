///////////////////////////////////////////// 主对象
/**
 * @author NZQ
 * @date 2018/12/24
 * @Description : 联合 Watcher Observer
 */
class SelfVue {
  /**
   * @author NZQ
   * @date 2018/12/25
   * @Param : data: 相关data, methods：相关方法, el: 对应元素
  */
  constructor(options, data = options.data, methods = options.methods, el = options.el) {
    let self = this;
    this.data = data;
    this.methods = methods;

    // 给相应的data数据设置代理
    Object.keys(this.data).forEach((key) => {
      self.proxyKeys(key);
    })

    observe(this.data);

    new Compile(el, this);

    // 通vue mounted 把mounted 绑定this
    options.mounted.call(this);

    return this;
  }

  // 实现 selfVue.name === selfVue.data.name, 为所有将要进行数据监听的数据都设置代理
  proxyKeys(key) {
    let self = this;
    Object.defineProperty(this, key, {
      enumerable: false, // 此处不可枚举，防止在实现数据监听是遍历到, 不能 for ... in  和 Object.keys()
      configurable: true,
      get: function proxyGetter() {
        return self.data[key];
      },
      set: function proxySetter(newVal) {
        self.data[key] = newVal;
      }
    })
  }
}

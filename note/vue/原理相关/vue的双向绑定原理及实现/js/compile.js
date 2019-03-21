class Compile {
  constructor(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
  }

  init() {
    if (this.el) {
      // 将el取出来放在
      this.fragment = this.nodeToFragment(this.el);
      this.compileElement(this.fragment);

      this.el.appendChild(this.fragment);

    } else {
      console.log('Dom元素不存在');
    }
  }

  /**
   * @author NZQ
   * @date 2018/12/24
   * @Description : 遍历el,并编译里面相应的指令，主要函数
   */
  compileElement(el) {
    let childNodes = el.childNodes
      ,self = this,
      reg = /^{{(.*)}}$/;

    [...childNodes].forEach((node) => {
      let text = node.textContent;
      if ( self.isTextNode(node) && reg.test(text)) { // text --- "{{}}"
        self.compileText(node, reg.exec(text)[1])
      } else if (self.isElementNode(node)) { // 相关指令
        self.compileDirective(node)
      }
      // 判断是否有子节点在遍历
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node)
      }
    })
  }

  /**
   * @author NZQ
   * @date 2018/12/24
   * @Description : 建一个fragment片段，将需要解析的dom节点存入fragment片段
   */
  nodeToFragment(el) {
    let fragment = document.createDocumentFragment()
      ,child = el.firstChild;
    while(child) {
      // 将Dom 元素移到fragment中，此后firstChild 是下一个节点
      fragment.appendChild(child);
      child = el.firstChild;
    }
/*   fragment.appendChild(el);*/
    // 此时el 为空
    return fragment;
  }

  /**
   * @author NZQ
   * @date 2018/12/24
   * @Description : 对“{{}}”，做相应的操作
   */
  compileText(node, exp) {
    let self = this
      ,initText = this.vm[exp]; // 初始化Observer get，但是此时订阅者的Dep.target 是空。不会添加订阅者进去
    self.updateText(node, initText); // 讲初始化的数据初始化到视图中
    new Watcher(this.vm, exp, (value) => { // 初始化的时候会设置一个Dep.target,并且触发Observer get
      self.updateText(node, value);
    })
  }

  /**
   * @author NZQ
   * @date 2018/12/25
   * @Description : 更新相应的文本文件
   */
  updateText(node, value) {
    /* node.textContent.replace(/^{{.*}}$/, () => {

     })*/
    node.textContent = typeof value === "undefined" ? "" : value;
  }

  /**
   * @author NZQ
   * @date 2018/12/25
   * @Description : 元素节点上面的指令处理
  */
  compileDirective(node) {
    let attrs = node.attributes
      ,self = this;
    // 遍历当前节点的所有的属性
    [...attrs].forEach((attr) => {
      let attrName = attr.name // 所有的属性名
        ,exp = attr.value;
      if (self.isModelDirective(attrName)) { // v-model
        self.compileModel(node, self.vm, exp)
      } else if (self.isEventDirective(attrName)) { // @, v-on
        self.compileEvent(node, self.vm, attrName, exp)
      } else if (self.isBindDirective(attrName)) { // :, v-bind

      }

    })
  }

  /**
   * @author NZQ
   * @date 2018/12/25
   * @Description : 编译 v-model
   */
  compileModel(node, vm, exp) {
    let self = this
      ,val = this.vm[exp]; // 得到data中初始化的值
    this.updateModel(node, val); // 初始化 v-model绑定的值

    new Watcher(this.vm, exp, (value) => {
      self.updateModel(node, value);
    })

    // 改变里面的树
    node.addEventListener("input", (e) => {
      let newVal = e.target.value; // 设置的新的值在
      if (newVal !== val) {
        self.vm[exp] = newVal;
        val = newVal;
      }
    })
  }

  /**
   * @author NZQ
   * @date 2018/12/25
   * @Description : 更新 v-model
   */
  updateModel(node, value, oldValue) {
    node.value = typeof value === "undefined" ? "" : value;
  }

  /**
   * @author NZQ
   * @date 2018/12/25
   * @Description : 编译相应事件绑定指令
  */
  compileEvent(node, vm, attrName, exp) {
    let eventType = attrName.replace("v-on:", "").replace("@", "")
      ,eventHandler = vm.methods && vm.methods[exp];

    if (eventType && eventHandler) {
      node.addEventListener(eventType, eventHandler.bind(vm), false)
    }
  }

  /**
   * @author NZQ
   * @date 2018/12/25
   * @Description : v-bind， :
  */
  isBindDirective(attrName) {
    return attrName.indexOf(":") === 0 || attrName.indexOf("v-bind:") === 0;
  }

  /**
   * @author NZQ
   * @date 2018/12/25
   * @Description : @click, v-on:
  */
  isEventDirective(attrName) {
    return attrName.indexOf(":") === 0 || attrName.indexOf('v-on:') === 0;
  }

  /**
   * @author NZQ
   * @date 2018/12/25
   * @Description : 是否是 v-model
  */
  isModelDirective(attrName) {
    return attrName.indexOf("v-model") === 0;
  }

  /**
   * @author NZQ
   * @date 2018/12/25
   * @Description : 是否是元素节点
  */
  isElementNode(node) {
    return node.nodeType === 1;
  }

  /**
   * @author NZQ
   * @date 2018/12/25
   * @Description : 是否是文本节点
  */
  isTextNode(node) {
    return node.nodeType === 3;
  }
}

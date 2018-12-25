/**
 * @author NZQ
 * @date 2018/12/24
 * @Description : 建一个fragment片段，将需要解析的dom节点存入fragment片段
 */
function nodeToFragment(el) {
  let fragment = document.createDocumentFragment()
    ,child = el.firstChild;
  while(child) {
    // 将Dom 元素移到fragment中，此后firstChild 是下一个节点
    fragment.appendChild(child);
  }
  return fragment;
}

class Compile {
  constructor(vm, el) {
    this.vm = vm;
    this.el = el;
  }

  /**
   * @author NZQ
   * @date 2018/12/24
   * @Description : 遍历el,并对“{{}}”形式进行处理
   */
  compileElement(el) {
    let childNodes = el.childNodes
      ,self = this,
      reg = /^{{.*}}$/;

    [...childNodes].forEach((node) => {
      let text = node.textContent;
      if ( node.nodeType === 3 && reg.test(text)) {
        // 判断当前 el 中是否存在{{}} 指令形式
        self.compileText(node, reg.exec(text)[1])
      }
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node)
      }
    })
  }

  /**
   * @author NZQ
   * @date 2018/12/24
   * @Description : 对“{{}}”，做相应的操作
   */
  compileText(node, exp) {
    let self = this
      ,initText = this.vm[exp];

    this.updateText(node, initText); // 讲初始化的数据初始化到视图中
    new Watcher(this.vm, exp, (value) => {
      self.updateText(node, value);
    })
  }

  /**
   * @author NZQ
   * @date 2018/12/25
   * @Description : 更新相应的"{{}}"
  */
  updateText(node, value) {
   /* node.textContent.replace(/^{{.*}}$/, () => {

    })*/
   node.textContent = typeof value === "undefined" ? "" : value;
  }
}
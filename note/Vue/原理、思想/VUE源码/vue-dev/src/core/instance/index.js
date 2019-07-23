import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 定义 Vue 构造函数
// Vue 构造函数整理-原型 http://hcysun.me/vue-design/appendix/vue-prototype.html
// 使用了安全模式来提醒你要使用 new 操作符来调用 Vue
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 该方法用 initMixin 方法添加
  this._init(options)
}

// 将 Vue 作为参数传递给导入的五个方法
// 每个 *Mixin 方法的作用其实就是包装 Vue.prototype，在其上挂载一些属性和方法，
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

// 导出 Vue
export default Vue

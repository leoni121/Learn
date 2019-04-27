/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

// Vue 构造函数整理-全局API http://hcysun.me/vue-design/appendix/vue-global-api.html
export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  // 只读的属性
  const configDef = {}
  configDef.get = () => config

  // 非生产环境下针对 set 做出提示
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }

  // Vue.config 代理的是从 core/config.js 文件导出的对象。
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // 在 Vue 上添加了 util 属性，这是一个对象，这个对象拥有四个属性分别是：warn、extend、
  // mergeOptions 以及 defineReactive。这四个属性来自于 core/util/index.js 文件。
  // Vue.util 以及 util 下的四个方法都不被认为是公共API的一部分，要避免依赖他们，但是你依
  // 然可以使用，只不过风险你要自己控制。并且，在官方文档上也并没有介绍这个全局API，所以能
  // 不用尽量不要用。
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

  // 空的对象
  Vue.options = Object.create(null)
  // ASSET_TYPES 来自于 shared/constants.js 文件
  /**
    const ASSET_TYPES = [
      'component',
      'directive',
      'filter'
    ]
  */
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  // extend 来自于 shared/util.js 文件，这句代码的意思就是将 builtInComponents 的属性混合到
  // Vue.options.components 中，其中 builtInComponents 来自于 core/components/index.js 文件。
  extend(Vue.options.components, builtInComponents)
  /**
    Vue.options.components = {
      KeepAlive
    }
    Vue.options = {
      components: {
        KeepAlive
      },
      directives: Object.create(null),
      filters: Object.create(null),
      _base: Vue
   }
 */


  // 在 Vue 构造函数上添加 use 方法，也就是 Vue.use 这个全局API
  initUse(Vue)
  // 在 Vue 上添加 mixin 这个全局API
  initMixin(Vue)
  // 在 Vue 上添加 Vue.cid 静态属性，和 Vue.extend 静态方法
  initExtend(Vue)
  // 在 Vue 上添加 Vue.component Vue.directive Vue.filter 三个静态方法
  // 分别用来全局注册组件，指令和过滤器
  initAssetRegisters(Vue)
}

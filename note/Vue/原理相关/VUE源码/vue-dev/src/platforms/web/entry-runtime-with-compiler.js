/* @flow */

/**
 * @Description: 重写了 Vue.prototype.$mount 方法；添加了 Vue.compile 全局API(在运行时版的基础上添加 compiler)
 */
import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

// 导入 运行时 的 Vue
import Vue from './runtime/index'
import { query } from './util/index'
// 从 ./compiler/index.js 文件导入 compileToFunctions
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

// 根据 id 获取元素的 innerHTML
const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})

// 缓存了运行时版的 $mount 函数，然后重新定义了 Vue.prototype.$mount
const mount = Vue.prototype.$mount

// 重写 Vue.prototype.$mount 方法
// 之所以重写 $mount 函数，其目的就是为了给运行时版的 $mount
// 函数增加编译模板的能力
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options

  // resolve template/el and convert to render function
  // 如果渲染函数存在那么什么都不会做
  // 如果渲染函数不存在的话，使用 template 或 el 选项构建渲染函数
  if (!options.render) {
    // 当前 vue 中是否有 template
    let template = options.template
    // 有template 的话，会将 template 编译成渲染函数，
    // 但开发者未必传递了 template 选项
    if (template) {
      // template 的类型是字符串
      if (typeof template === 'string') {
        // 如果第一个字符是 #，那么会把该字符串作为 css 选择符去选中
        // 对应的元素，并把该元素的 innerHTML 作为模板
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)

          /* istanbul ignore if */
          // 没有 template
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }

        // 如果第一个字符不是 #，那么什么都不做，就用 template 自身的字符串值作为模板
      } else if (template.nodeType) {
        // template 的类型是元素节点(template.nodeType 存在)
        // 使用该元素的 innerHTML 作为模板
        template = template.innerHTML
      } else {
        // 若 template 既不是字符串又不是元素节点，那么在非生
        // 产环境会提示开发者传递的 template 选项无效
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      // 没有 template ，但是存在 el 的话则使用 el.outerHTML 作为 template 的值
      template = getOuterHTML(el)
    }

    // 经过上面的处理之后的 template 是一个字符串（innerHTML 的结果是字符串）
    // 字符串不为空
    if (template) {
      /* istanbul ignore if */
      // 统计编译器性能的，类似 Vue.prototype._init 函数中的代码
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      // 将模板(template)字符串编译为渲染函数(render)，
      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)

      // 将渲染函数添加到 vm.$options 选项中
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      // 统计编译器性能的，类似 Vue.prototype._init 函数中的代码
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }

  return mount.call(this, el, hydrating)
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 * 获取元素的 outerHTML(除了包含innerHTML的全部内容外, 还包含对象标签本身)
 */
function getOuterHTML (el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    // 在 IE9-11 中 SVG 标签元素是没有 innerHTML 和 outerHTML 这两个属性的
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

// 在 Vue 上添加一个全局API `Vue.compile` 其值为
// 上面导入进来的 compileToFunctions
// 暴露给开发者的工具函数，他能够将字符串编译为渲染函数
Vue.compile = compileToFunctions

// 导出 Vue
export default Vue

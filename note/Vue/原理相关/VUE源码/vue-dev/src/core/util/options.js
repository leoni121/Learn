/* @flow */

import config from '../config'
import { warn } from './debug'
import { set } from '../observer/index'
import { unicodeRegExp } from './lang'
import { nativeWatch, hasSymbol } from './env'

import {
  ASSET_TYPES,
  LIFECYCLE_HOOKS
} from 'shared/constants'

import {
  extend,
  hasOwn,
  camelize,
  toRawType,
  capitalize,
  isBuiltInTag,
  isPlainObject
} from 'shared/util'

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 *
 * 选项覆盖策略是处理如何将父选项值和子选项值合并到最终值的函数。
 *
 * config.optionMergeStrategies 是一个合并选项的策略对象，这个对象下包含很多函数，
 * 这些函数就可以认为是合并特定选项的策略。这样不同的选项使用不同的合并策略，
 * 如果你使用自定义选项，那么你也可以自定义该选项的合并策略，只需要在
 * Vue.config.optionMergeStrategies 对象上添加与自定义选项同名的函数就行。
 *
 * config 对象是全局配置对象，来自于 core/config.js 文件
 */
const strats = config.optionMergeStrategies

/**
 * Options with restrictions
 *
 * strats.el 和 strats.propsData 这两个策略函数是只有在非生产环境才有的，
 * 在生产环境下访问这两个函数将会得到 undefined，
 * 那这个时候 mergeField 函数的第一句代码就起作用了：const strat = strats[key] || defaultStrat
 */
if (process.env.NODE_ENV !== 'production') {
  // 在 strats 策略对象上添加两个策略(两个属性)分别是 el 和 propsData
  strats.el = strats.propsData = function (parent, child, vm, key) {
    // vm 是 mergeField 传入的
    // 策略函数中如果拿不到 vm 参数，那说明处理的是子组件选项。
    // 因为 Vue.extend 创建子类的时候 mergeOptions 会被调用，此时策略函数就拿不到第三个参数。
    if (!vm) {
      warn(
        `option "${key}" can only be used during instance ` +
        'creation with the `new` keyword.'
      )
    }
    return defaultStrat(parent, child)
  }
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to: Object, from: ?Object): Object {
  if (!from) return to
  let key, toVal, fromVal

  const keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from)

  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    // in case the object is already observed...
    if (key === '__ob__') continue
    toVal = to[key]
    fromVal = from[key]
    if (!hasOwn(to, key)) {
      set(to, key, fromVal)
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal)
    }
  }
  return to
}

/**
 * Data
 *
 * mergeDataOrFn 函数的返回值作为策略函数的最终返回值。
 * 返回一个函数
 */
export function mergeDataOrFn (
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  // 子组件
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    // 选项是在调用 Vue.extend 函数时进行合并处理的，此时父子 data 选项都应该是函数。
    // 如果没有子选项则使用父选项，没有父选项就直接使用子选项，
    // 且这两个选项都能保证是函数，如果父子选项同时存在，则代码继续进行
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal, // 第一个 this 指定了 data 函数的作用域，而第二个 this 就是传递给 data 函数的参数。
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal // 第一个 this 指定了 data 函数的作用域，而第二个 this 就是传递给 data 函数的参数。
      )
    }
    // 非子组件
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      const instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal
      const defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

// 在 strats 策略对象上添加 data 策略函数，用来合并处理 data 选项
strats.data = function (
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  // 当没有 vm 参数时，说明处理的是子组件的选项
  if (!vm) {
    // 判断是否传递了子组件的 data 选项(即：childVal)，
    // 并且检测 childVal 的类型是不是 function，
    // 如果 childVal 的类型不是 function 则会给你一个警告，
    // 也就是说 childVal 应该是一个函数，如果不是函数会提示你 data 的类型必须是一个函数，
    // 这就是我们知道的：子组件中的 data 必须是一个返回对象的函数。
    // 如果不是函数，除了给你一段警告之外，会直接返回 parentVal。
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      )

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
}

/**
 * Hooks and props are merged as arrays.
 *
 * 组件选项的生命周期钩子函数被合并成一个数组。
 */
function mergeHook (
  parentVal: ?Array<Function>,
  childVal: ?Function | ?Array<Function>
): ?Array<Function> {
  const res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
  return res
    ? dedupeHooks(res)
    : res
}
/**
* return (是否有 childVal，即判断组件的选项中是否有对应名字的生命周期钩子函数)
  ? 如果有 childVal 则判断是否有 parentVal
    ? 如果有 parentVal 则使用 concat 方法将二者合并为一个数组
    : 如果没有 parentVal 则判断 childVal 是不是一个数组
      ? 如果 childVal 是一个数组则直接返回
      : 否则将其作为数组的元素，然后返回数组
 : 如果没有 childVal 则直接返回 parentVal
*/

function dedupeHooks (hooks) {
  const res = []
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i])
    }
  }
  return res
}

// LIFECYCLE_HOOKS 常量来自于 shared/constants.js 文件
LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 *
 * 合并处理 directives、filters 以及 components 等资源选项
 */
function mergeAssets (
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): Object {
  const res = Object.create(parentVal || null)
  if (childVal) {
    // assertObjectType 函数用来检测 childVal 是不是一个纯对象
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm)
    return extend(res, childVal)
    /**
     * res = {
          ChildComponent
          // 原型
          __proto__: { // parentVal
            KeepAlive,
            Transition,
            TransitionGroup
          }
        }
     * */
  } else {
    return res
  }
}

// ASSET_TYPES 常量来自于 shared/constants.js 文件 ['component', 'directive', 'filter']
// 数组中的字符串与真正的资源选项名字相比要少一个字符 s
ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets
})

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): ?Object {
  // work around Firefox's Object.prototype.watch...
  // 在 Firefox 浏览器中 Object.prototype 拥有原生的 watch 函数
  if (parentVal === nativeWatch) parentVal = undefined
  if (childVal === nativeWatch) childVal = undefined
  /* istanbul ignore if */
  if (!childVal) return Object.create(parentVal || null)
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm)
  }
  if (!parentVal) return childVal
  // 定义 ret 常量，其值为一个对象
  const ret = {}
  // 将 parentVal 的属性混合到 ret 中，后面处理的都将是 ret 对象，最后返回的也是 ret 对象
  extend(ret, parentVal)
  // 遍历 childVal
  for (const key in childVal) {
    // 由于遍历的是 childVal，所以 key 是子选项的 key，父选项中未必能获取到值，所以 parent 未必有值
    let parent = ret[key]
    // child 是肯定有值的，因为遍历的就是 childVal 本身
    const child = childVal[key]
    // 这个 if 分支的作用就是如果 parent 存在，就将其转为数组
    if (parent && !Array.isArray(parent)) {
      parent = [parent]
    }
    ret[key] = parent
      // 最后，如果 parent 存在，此时的 parent 应该已经被转为数组了，所以直接将 child concat 进去
      ? parent.concat(child)
      // 如果 parent 不存在，直接将 child 转为数组返回
      : Array.isArray(child) ? child : [child]
  }
  // 最后返回新的 ret 对象
  return ret
}

/**
 * Other object hashes.
 *
 * 选项 props、methods、inject、computed 的合并策略
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): ?Object {
  // 如果存在 childVal，那么在非生产环境下要检查 childVal 的类型
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm)
  }
  // parentVal 不存在的情况下直接返回 childVal
  if (!parentVal) return childVal
  // 如果 parentVal 存在，则创建 ret 对象，然后分别将 parentVal 和 childVal 的属性混合到 ret 中，注意：由于 childVal 将覆盖 parentVal 的同名属性
  const ret = Object.create(null)
  extend(ret, parentVal)
  if (childVal) extend(ret, childVal)
  // 最后返回 ret 对象。
  return ret
}

// provide 选项的合并策略与 data 选项的合并策略相同，都是使用 mergeDataOrFn 函数。
strats.provide = mergeDataOrFn

/**
 * Default strategy.
 *
 * 默认的策略，当一个选项不需要特殊处理的时候就使用默认的合并策略，
 * 只要子选项不是 undefined 那么就是用子选项，否则使用父选项。
 */
const defaultStrat = function (parentVal: any, childVal: any): any {
  return childVal === undefined
    ? parentVal
    : childVal
}

/**
 * Validate component names
 *
 * 校验组件的名字是否符合要求
 */
function checkComponents (options: Object) {
  for (const key in options.components) {
    validateComponentName(key)
  }
}

// 校验组件的名字是否符合要求
export function validateComponentName (name: string) {
  // Vue 限定组件的名字由普通的字符和中横线(-)组成，且必须以字母开头
  if (!new RegExp(`^[a-zA-Z][\\-\\.0-9_${unicodeRegExp.source}]*$`).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    )
  }
  // isBuiltInTag 方法的作用是用来检测你所注册的组件是否是内置的标签
  //  config.isReservedTag 检测是否是保留标签
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    )
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 *
 * 最终是将 props 规范为对象的形式
 *
 * props: ["someData"]
 * ==》
 * props: {
 *     someData:{
 *       type: null
 *     }
 *   }
 */
function normalizeProps (options: Object, vm: ?Component) {
  const props = options.props
  if (!props) return
  const res = {}
  let i, val, name
  if (Array.isArray(props)) {
    i = props.length
    while (i--) {
      val = props[i]
      if (typeof val === 'string') {
        // 这个函数来自于 shared/util.js
        // 驼峰化 aaa-bbb => aaaBbb
        name = camelize(val)
        res[name] = { type: null }
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.')
      }
    }
    // 判断 props 是否是一个纯的对象
  } else if (isPlainObject(props)) {
    for (const key in props) {
      val = props[key]
      name = camelize(key)
      res[name] = isPlainObject(val)
        ? val
        : { type: val }
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      `Invalid value for option "props": expected an Array or an Object, ` +
      `but got ${toRawType(props)}.`,
      vm
    )
  }
  options.props = res
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options: Object, vm: ?Component) {
  const inject = options.inject
  if (!inject) return
  const normalized = options.inject = {}
  if (Array.isArray(inject)) {
    for (let i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] }
    }
  } else if (isPlainObject(inject)) {
    for (const key in inject) {
      const val = inject[key]
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val }
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      `Invalid value for option "inject": expected an Array or an Object, ` +
      `but got ${toRawType(inject)}.`,
      vm
    )
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options: Object) {
  const dirs = options.directives
  if (dirs) {
    for (const key in dirs) {
      const def = dirs[key]
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def }
      }
    }
  }
}

// 判断是不是纯对象
function assertObjectType (name: string, value: any, vm: ?Component) {
  if (!isPlainObject(value)) {
    warn(
      `Invalid value for option "${name}": expected an Object, ` +
      `but got ${toRawType(value)}.`,
      vm
    )
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 *
 * 第一，这个函数将会产生一个新的对象；
 * 第二，这个函数不仅仅在实例化对象(即_init方法中)的时候用到，在继承(Vue.extend)中也有用到，
 * 所以这个函数应该是一个用来合并两个选项对象为一个新对象的通用程序。
 */
export function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }

  // child 参数除了是普通的选项对象外，还可以是一个函数，
  // 如果是函数的话就取该函数的 options 静态属性作为新的 child
  // 这就允许我们在进行选项合并的时候，去合并一个 Vue 实例构造者的选项
  if (typeof child === 'function') {
    child = child.options
  }

  // 规范化选项的函数
  // 像 Props 在Vue 中有多种写法，给开发人员提供了遍历
  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    // hasOwn 函数来自于 shared/util.js 文件，
    // 用来判断一个属性是否是对象自身的属性(不包括原型上的)
    // 如果 child 对象的键也在 parent 上出现，那么就不要再调用 mergeField 了，
    // 因为在上一个 for in 循环中已经调用过了，这就避免了重复调用。
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    // 当一个选项没有对应的策略函数时，使用默认策略
    const strat = strats[key] || defaultStrat
    // vm mergeOptions 传入的 vm 实例
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
export function resolveAsset (
  options: Object,
  type: string,
  id: string,
  warnMissing?: boolean
): any {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  const assets = options[type]
  // check local registration variations first
  if (hasOwn(assets, id)) return assets[id]
  const camelizedId = camelize(id)
  if (hasOwn(assets, camelizedId)) return assets[camelizedId]
  const PascalCaseId = capitalize(camelizedId)
  if (hasOwn(assets, PascalCaseId)) return assets[PascalCaseId]
  // fallback to prototype chain
  const res = assets[id] || assets[camelizedId] || assets[PascalCaseId]
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    )
  }
  return res
}

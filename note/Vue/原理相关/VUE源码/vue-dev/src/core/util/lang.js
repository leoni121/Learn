/* @flow */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
export const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/

/**
 * Check if a string starts with $ or _
 *
 * isReserved 函数通过判断一个字符串的第一个字符是不是 $ 或 _
 * 来决定其是否是保留的，Vue 是不会代理那些键名以 $ 或 _ 开头的字段的，
 * 因为 Vue 自身的属性和方法都是以 $ 或 _ 开头的
 */
export function isReserved (str: string): boolean {
  const c = (str + '').charCodeAt(0)
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

/**
 * Parse simple path.
 */
// 触发 '**.**' 的 get 拦截器函数，同时新函数会将 '**.**' 的值返回
const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`)
// 不是 \w，也就是说这个位置不能是 字母 或 数字 或 下划线
// 不是字符 .
// 不是字符 $
export function parsePath (path: string): any {
  // path 中含有特殊的 字符
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}

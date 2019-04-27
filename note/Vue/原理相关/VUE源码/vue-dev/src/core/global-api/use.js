/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 获取安装的列表
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))

    // 已经安装
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {  // 检查插件是否有install
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') { // 没有 install
      plugin.apply(null, args)
    }

    // 添加到安装列表，防止重复安装
    installedPlugins.push(plugin)
    return this
  }
}

/**
 * @author NZQ
 * @data 2019/3/12
 * @Description : 主要参考 ———— https://segmentfault.com/a/1190000012296163
 */

Vue.use = function (...args) {
  const plugin = args.shift()
  args.unshift(this); // 传入 Vue
  const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))

  if (installedPlugins.indexOf(plugin) > -1) {
    return this
  }

  if (typeof plugin.install === 'function') {
    plugin.install.apply(plugin, args)
  } else if (typeof plugin === 'function') {
    plugin.apply(null, args)
  }
  installedPlugins.push(plugin)
  return this
}

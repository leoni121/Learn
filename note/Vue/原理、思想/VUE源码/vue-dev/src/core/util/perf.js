/**
 * @Description: 在非生产环境，且浏览器必须支持 window.performance API的情况下才会导出有用的 mark 和 measure 函数，也就是说，如果你的浏览器不支持 window.performance 那么在 core/instance/init.js 文件中导入的 mark 和 measure 就都是 undefined，也就不会执行 if 语句里面的内容。
 */
import { inBrowser } from './env'

export let mark
export let measure

if (process.env.NODE_ENV !== 'production') {
  const perf = inBrowser && window.performance
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = tag => perf.mark(tag)
    measure = (name, startTag, endTag) => {
      perf.measure(name, startTag, endTag)
      perf.clearMarks(startTag)
      perf.clearMarks(endTag)
      // perf.clearMeasures(name)
    }
  }
}

/**
 * @author Nzq
 * @date 2019/3/9
 * @Description: 得到相应的对象， 该方程参考https://www.cnblogs.com/rusr/p/8984604.html
 * @Param:
*/
function getType(arg) {
  let typeOf = Object.prototype.toString.call;
  let map = {
    '[object Boolean]'  : 'boolean',
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Object]'   : 'object',
  }
  return arg instanceof Element ? 'element' : map[typeOf(arg)];
}

/**
 * @author Nzq
 * @date 2019/3/9
 * @Description: 拷贝
 * @Param:
*/

function deepColne(arg) {
  let type = getType(arg);
}

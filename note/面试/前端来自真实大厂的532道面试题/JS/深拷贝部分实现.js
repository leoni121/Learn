/**
 * @author Nzq
 * @date 2019/3/9
 * @Description: 得到相应的对象， 该方程参考https://www.cnblogs.com/rusr/p/8984604.html
 * @Param:
 */
function getType(obj) {
  let getType = Object.prototype.toString;
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
  // return (obj instanceof Element) ? 'element' : map[typeOf(obj)];
  return  map[getType.call(obj)]
}

/**
 * @author Nzq
 * @date 2019/3/9
 * @Description: 拷贝
 * @Param:
 */
function deepClone(obj) {
  let visitedQueue = [];

  return (
    function _deepClone(obj) {
      let resObj;
      let type = getType(obj);

      if (type === 'object') {
        resObj = {};
      } else if (type === 'array') {
        resObj = [];
      } else {
        return obj
      }

      for(let key in obj){
        let index = visitedQueue.indexOf(obj[key]);
        if (index >= 0) { // 检查是否已经遍历
          resObj[key] = obj[key];
        } else {
          visitedQueue.push(obj[key]);
          resObj[key] = _deepClone(obj[key]);
        }
      }

      return resObj;
    }
  )(obj)
}

/**
 * @author Nzq
 * @date 2019/3/10
 * @Description: 广度优先
 * @Param:
 */
function deepClone1 (nzq) {
  let resObj = {};
  let originQueue = [nzq]; // 用来（广度）遍历循环
  let copyOriginQueue = [resObj]; // 这个和上一个保持同步（不然会copy出错）

  //以下两个队列用来保存复制过程中访问过的对象，以此来避免对象环的问题（对象的某个属性值是对象本身）
  let visitedQueue = []; // 记录已经遍历了的对象

  while (originQueue.length) {
    // _obj 和 _resObj 是同步的，相对应
    let _obj = originQueue.shift();
    let _resObj = copyOriginQueue.shift();

    visitedQueue.push(_obj); // 记录

    for (let key in _obj) {
      let _value = _obj[key];

      if (getType(_value) !== 'object') { // 当前不是Object
        _resObj[key] = _value;
      } else { // 当前是Object

        let index = visitedQueue.indexOf(_value); // 查看是否已经访问过
        if (index >= 0) { // 记录中有

          _resObj[key] = visitedQueue[index];
        } else { // 记录中没有

          // 当前_value 是对象将其放入originQueue 中
          originQueue.push(_value);
          // 为了保持同步
          _resObj[key] = {};
          // 将_value 对应的对象放入copyOriginQueue中
          copyOriginQueue.push(_resObj[key]);
        }
      }
    }
  }

  return resObj
}

let  nzq = {
  name: 'nzq',
  people: {
    lover: null,
    father: {
      name: 'nhj',
      age: '56'
    }
  }
}
let wx = {
  name: 'wx',
  people: {
    lover: nzq,
    father: {
      age: '56'
    }
  }
}
nzq.people.lover = wx;
console.log(deepClone1(nzq))

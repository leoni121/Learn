/**
 * @Author nzq
 * @Date 2019-07-29
 * @Description:
 *
 *  var entry = {
  a: {
   b: {
     c: {
       dd: 'abcdd'
     }
   },
   d: {
     xx: 'adxx'
   },
   e: 'ae'
  }
}

 // 要求转换成如下对象
 var output = {
'a.b.c.dd': 'abcdd',
'a.d.xx': 'adxx',
'a.e': 'ae'
}
 * @Param:
 * @Return:
 */

let object = {
  b: { c: 4 }, d: [{ e: 5 }, { e: 6 }]
};

function parse(obj, ins) {
  let tempObj = obj;
  let tempStr = "";
  ins = ins.replace(/\[|\]/g, (match) => {
    return match === '[' ? '.' : ''
  }).split('.');
  while (ins.length) {
    tempStr = ins.shift();
    if (!(tempObj = tempObj[tempStr])) {
      return undefined;
    }
  }
  return tempObj ? tempObj : undefined;
}

console.log( parse(object, 'b.c') === 4 ) // true
console.log( parse(object, 'd[1].e') === 5 ) //true
console.log( parse(object, 'd.0.e') === 5 ) //true
console.log( parse(object, 'd[1].e') === 6 ) //true
console.log( parse(object, 'd.1.e') === 6 ) //true
console.log( parse(object, 'f') === undefined) //true

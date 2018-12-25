/**
 * @author NZQ
 * @data 2018/12/24
 * @Description : 对象遍历回顾
 */
let obj = {
  one: 1,
  two: 2,
  three: {
    threeOne: 31,
    threeTwo: 32,
    threeThree: {
      ttOne: 331,
      ttTwo: "nzq"
    }
  }
}
function observer(obj) {
  Object.keys(obj).forEach(function (v, idx, arr) {
    let item = obj[v];
    if (typeof item === 'number') {
      // 这里用 item ++, 得不到预期结果（item现在是数值，item改变obj[v]不会改变）
      obj[v]=obj[v]+1;
      console.log(item)
    }
    if (typeof item === 'object'){
      observer(item)
    }
  })

}

observer(obj);
console.log(obj);
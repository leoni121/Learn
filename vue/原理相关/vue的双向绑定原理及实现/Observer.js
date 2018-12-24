/**
 * @author NZQ
 * @data 2018/12/24
 * @Description : 数据监听器
 */
const obj = {
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
    console.log(typeof v)
    if (typeof v === 'number') {
      v = v + 1;
    }
    if (typeof v === 'object'){
      observer(v)
    }
  })

}

observer(obj);
console.log(obj);
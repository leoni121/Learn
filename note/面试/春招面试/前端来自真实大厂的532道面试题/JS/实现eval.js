const OBJ = {
  name: 'nzq'
}
/**
 * @Author nzq
 * @Date 2019/3/23
 * @Description: 实现类似 eval
 * @Param:
 * @Return:
 */
function _eval(str) {
  let arr = str.split(".");
  let len = arr.length;
  let temp = null;
  if (arr[0] === "obj") {
    temp = OBJ;
    for (let i = 1; i < len; i++) {
      if (temp[arr[i]]) {
        temp = temp[arr[i]];
      } else {
        return undefined
      }
    }
  }
  return temp;
}

console.log(_eval("obj.name"))

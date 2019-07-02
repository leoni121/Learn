/**
 * @Author nzq
 * @Date 2019/5/7
 * @Description: 参考 —— https://www.jianshu.com/p/6e7f88ead393
 * @Param:
 * @Return:
 */
function sort(arr) {
  let len = arr.length;
  if (!len) return;
  let result = [];

  (function _sort(arr, idx) {
    if (idx === len - 1) {
      result.push(arr.slice());
    } else {
      for (let i = idx; i < len; i++) {
        [arr[i], arr[idx]] = [arr[idx], arr[i]];
        _sort(arr, idx + 1);
        [arr[i], arr[idx]] = [arr[idx], arr[i]];
      }
    }
  })(arr, 0);

  console.log(arr);
  return result;
}

console.log(sort(["A", "B", "C"]));
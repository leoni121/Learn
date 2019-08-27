/**
 * @Author nzq
 * @Date 2019-07-29
 * @Description:
 *    输入 '1, 2, 3, 5, 7, 8, 10' 输出 '1~3, 5, 7~8, 10'
 * @Param:
 * @Return:
 */

function simplifyStr(arr) {
  let len = arr.length,
    res =[],
    pre;

  if (len <= 1) return arr;
  pre = arr[0];

  for (let i = 0; i < len; i++) {
    if (arr[i+1] !== arr[i] + 1) { // 断裂
      if (arr[i] !== pre) {
        res.push(`${pre}~${arr[i]}`);
      } else {
        res.push(pre);
      }
      pre = arr[i+1];
    }
  }
  return res;
}

const nums1 = [1, 2, 3, 5, 7, 8, 10];

console.log(try1(nums1))

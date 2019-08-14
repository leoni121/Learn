/**
 * @Author nzq
 * @Date 2019-08-13
 * @Description:
 * 给出n个正整数，要求找出相邻两个数字中差的绝对值最小的一对数字，如果有差的绝对值相同的，则输出最前面的一对数。2<n<=100，正整数都在10^16范围内
 * @Param:
 * @Return:
 */
function getMinDiff(arr) {
  if (arr.length === 2) {
    print(arr[0], arr[1]);
  }

  let res = [arr[0], arr[1]],
    diff = Math.abs(arr[1]-arr[0]),
    temp = 0;

  for (let i = 2;i<n;i++) {
    temp = Math.abs(arr[i] - arr[i - 1]);
    if (temp < diff) {
      res  = [arr[i-1], arr[i]];
      diff = temp;
    }
  }

  return [res[0], res[1]];
}

/**
 * @Author nzq
 * @Date 2019-07-13
 * @Description: 把一根绳子剪成多段，并且使得每段的长度乘积最大。
   n = 2
   return 1 (2 = 1 + 1)
   n = 10
   return 36 (10 = 3 + 3 + 4)
 * @Param:
 * @Return:
 */
// 2 + 3
// 解法一：贪心
function _integerBreak(num) {
  let mod = num % 3,
    time = Math.floor(num / 3);
  if (mod === 0) {
    return Math.pow(3, time);
  } else if (mod === 1) {
    return Math.pow(3, time-1) * 4;
  } else {
    return Math.pow(3, time) * 2;
  }
}

// 解法二：动态规划
function integerBreak(num) {
  let res = [];
  for (let i = 1; i <= num; i++) res[i] = 1;
  // 第二个数开始（2 开始）
  for (let i = 2; i <= num; i++) {
    for (let j = 1; j < i; j++) {
      res[i] = Math.max.call(null, res[i], j*(i-j), res[j]*(i-j));
    }
  }
  return res[num];
}

// 测试
console.log(_integerBreak(11), integerBreak(11))

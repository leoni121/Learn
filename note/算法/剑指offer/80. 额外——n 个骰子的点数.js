/**
 * @Author nzq
 * @Date 2019-08-02
 * @Description: 把 n 个骰子仍在地上，求点数和为 s 的概率。
 * @Param:
 * @Return:
 */
// 思路一：递归
function _rate(s, n) {
  if(n === 0 || s === 0) return 0;
  if(n === 1 && s <= 6) return 1;
  let max = s > 6 ? 6 : s,
    count = 0;

  for (let i = 1; i <= max; i++) {
    count += _rate(s-i, n-1);
  }

  return count/Math.pow(6, n);
}

// 思路二：动态规划
function __rate(s, n) {
  const face = 6;
  const pointNum = face * n;
  const dp = [];

  for (let i = 1; i <= face; i++) dp[i] = [];
  for (let i = 1; i <= face; i++) dp[1][i] = 1;

  for (let i = 2; i <= n; i++) {
    for (let j = i; j <= pointNum; j++){ /* 使用 i 个骰子最小点数为 i */
      for (let k = 1; k <= face && k <= j; k++) {
        dp[i][j] += dp[i - 1][j - k];
      }
    }
  }

  const totalNum = Math.pow(6, n);
  let ret = [];
  for (let i = n; i <= pointNum; i++) {
    ret[i] =  dp[n][i] / totalNum;
  }

  return ret;
}
console.log(_rate(4,3));

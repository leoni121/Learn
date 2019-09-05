/**
 * @Author nzq
 * @Date 2019-08-02
 * @Description: 把 n 个骰子仍在地上，求点数和为 s 的概率。
 * @Param:
 * @Return:
 */
// 思路一：递归，计算总共有多少种可能得到s
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
  const dp = []; //　前 i 个骰子产生点数 j 的次数。

  // 初始化
  for (let i = 1; i <= face; i++) dp[i] = [];
  for (let i = 1; i <= pointNum; i++) dp[1][i] = 1;

  for (let i = 2; i <= n; i++) { //　对应的骰子个数
    for (let j = i; j <= pointNum; j++){ // 使用 i 个骰子最小点数为 i
      for (let k = 1; k <= face && k <= j; k++) {　
        // 和为n的骰子出现的次数，应该等于上一次循环中骰子点数和
        // 为n-1、n-2、n-3、n-4、n-5与n-6的总和。所以我们把另一个数组
        // 的第n个数字设为前一个数组对应的第n-1、n-2、n-3、n-4、n-5与n-6之和。
        dp[i][j] = ~~dp[i][j] +  ~~dp[i - 1][j - k];
      }
    }
  }

  const totalNum = Math.pow(6, n);
  let ret = [];
  // n　骰子
  for (let i = n; i <= pointNum; i++) {
    ret[i] =  dp[n][i] / totalNum;
  }

  return ret;
}
console.log(__rate(4,3));

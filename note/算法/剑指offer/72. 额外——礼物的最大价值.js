/**
 * @Author nzq
 * @Date 2019-07-22
 * @Description: 在一个 m\*n 的棋盘的每一个格都放有一个礼物，每个礼物都有一定价值（大于 0）。从左上角开始拿礼物，每次向右或向下移动一格，直到右下角结束。给定一个棋盘，求拿到礼物的最大价值。例如，对于如下棋盘
 * @Param:
 * @Return:
 */

// 思路一：动态规划
// 状态S[i][j]表示我们走到(i, j)这个格子时，最多能收集到多少个苹果。
// A[i][j]代表格子(i, j)处的苹果数量。
// S[i][j]=A[i][j] + max(S[i-1][j], if i>0 ; S[i][j-1], if j>0)

function getMost (values) {
// write code here
  let n = values.length;
  let dp = [];
  for (let i = 0; i < n; i++) dp[i] = [];

  dp[0][0] = values[0][0];
  // 初始左、上两个边上面的值
  for (let i = 1; i < n; i++) {
    dp[0][i] = dp[0][i-1]+values[0][i];
    dp[i][0] =dp[i-1][0]+values[i][0];
  }
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + values[i][j];
    }
  }
  return dp[n - 1][n - 1];
}


let values = [
  [1,10,3,8],
  [12,2,9,6],
  [5,7,4,11],
  [3,7,16,5]
]

console.log(getMost(values));

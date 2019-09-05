/**
 * @Author nzq
 * @Date 2019-07-24
 * @Description: 题目描述
 股票的最大利润（一次卖出）
假设把某股票的价格按照时间先后顺序存储在数组中，
请问买卖该股票一次可获得的最大利润是多少？

例子：
例如，一只股票在某些时间节点的价格为
{9,11,8,5,7,12,16,14}。如果我们能在价格为5的时候买
入并在价格为16时卖出，则能获得最大的利润为11.
 * @Param:
 * @Return:
 */

// 思路一：动态规划
function _maxProfit(prices) {
  let len = prices.length;
  if(prices.length<=1) return 0;

  let res = [], // 以对应位置开始买入的解
    max = 0,
    diff = 0;
  // len-2 位置买入
  res[len-2] = prices[len-1] - prices[len-2];
  max = res[len-2];

  for(let i = len-3; i >= 0; i--) {
    diff = prices[i+1] - prices[i];
    // 当前一个和后一个相等时, 或者后一个 大于0时
    res[i] = diff + (res[i+1]>0 || diff===0 ? res[i+1] : 0);
    if(res[i] > max) max = res[i];
  }

  console.log(res);
  return max;
}

//　思路二：贪心策略，假设第 i 轮进行卖出操作，买入操作价格应该在 i 之前并且价格最低。
function maxProfit(prices) {
  if (prices == null || prices.length == 0)
    return 0;
  let soFarMin = prices[0];
  let maxProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    soFarMin = Math.min(soFarMin, prices[i]);
    maxProfit = Math.max(maxProfit, prices[i] - soFarMin);
  }
  return maxProfit;
}
console.log(_maxProfit([9,11,8,5,7,12,16,14]));
console.log(_maxProfit([7,8,5,3,6,4]));

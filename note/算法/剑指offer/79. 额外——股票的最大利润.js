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


function maxProfit(prices) {
  let len = prices.length;
  if(prices.length<=1) return 0;
  
  let res = [],
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

console.log(maxProfit([9,11,8,5,7,12,16,14]));
console.log(maxProfit([7,8,5,3,6,4]));
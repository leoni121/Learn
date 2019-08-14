/**
 * @Author nzq
 * @Date 2019-08-13
 * @Description: 小C在做一种特殊的服务器负载测试，对于一个请求队列中的请求，每一个请求都有一个负荷值，为了保证服务器稳定，请求队列中的请求负荷必须按照先递增后递减的规律(仅递增，仅递减也可以)，比如[ 1，2，8，4，3 ]，[ 1，3，5 ]和[ 10 ]这些是满足规律的，还有一些不满足的，比如[ 1，2，2，1 ]，[ 2，1，2 ]和[ 10，10 ]。现在给你一个请求队列，你可以对请求的负荷值进行增加，要求你调整队列中请求的负荷值，使数组满足条件。最后输出使队列满足条件最小的增加总和。

 * @Param:
 * @Return:
 */

function get (arr) {
  let pre = arr[0],
    dp = [0],
    len = arr.length;

  // 把数组从 0 到 i  加成递增需要的数量
  // dp[len-1] 表示需要添加的次数
  for (let i = 1; i < len; i++) {
    //                                   pre + 1 === arr[i] => (7, 8)
    dp[i] = dp[i-1] + Math.max(0, pre + 1 - arr[i]);
    pre = Math.max(pre + 1, arr[i]); // 记录以前或以前最大的
    console.log(dp[i], pre)
  }

  let res = dp.pop(),
    cur = 0;
  pre = arr.pop();
  for (let i = len - 2; i >= 0; i--) {
    // 重复加 的部分               value: arr[i] 需要                                           pre + 1 === arr[i] =>  (8, 7)
    let repeat = Math.min(dp[i] - (i===0 ? 0 : dp[i-1]) , Math.max(0, pre + 1 - arr[i]));

    // 把数组从 i 到 n-1 加成递减需要的数量
    cur += Math.max(0, pre - arr[i] + 1); // 记录以后或以后较大的
    pre = Math.max(pre + 1, arr[i]);
    // dp[i] + cur - repeat  这个值为把第 i 个元素变成最大的元素，往左递减，往右递减，需要花费的最小代价
    console.log(dp[i] - (i===0 ? 0 : dp[i-1]), Math.max(0, pre + 1 - arr[i]), cur, pre, dp[i])
    // 算出每一个情况，取最小
    res = Math.min(dp[i] + cur - repeat, res);
  }

  return res;
}
console.log(get([ 1,2,8,3,4 ]))

 // 1,2,8,3,4
  //0 0 0 6 6
  //1 2 8 9 10 pre
  //0 0 0 6 12 dp

//  1,2,8,3,4
  //9 7 0 2 0
// 10 9 8 5 4 cur
// 18 9 2 2 0 pre

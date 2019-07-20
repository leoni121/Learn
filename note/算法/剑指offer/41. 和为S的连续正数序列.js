/**
 * @Author nzq
 * @Date 2019/5/30
 * @Description: 小明很喜欢数学,有一天他在做数学作业时,要求计算出9~16的和,他马上就写出了正确答案是100。但是他并不满足于此,他在想究竟有多少种连续的正数序列的和为100(至少包括两个数)。没多久,他就得到另一组连续正数和为100的序列:18,19,20,21,22。现在把问题交给你,你能不能也很快的找出所有和为S的连续正数序列? Good Luck!
 *  输出所有和为S的连续正数序列。序列内按照从小至大的顺序，序列间按照开始数字从小到大的顺序
 * @Param:
 * @Return:
 */

function FindContinuousSequence(sum)
{
  if (sum<3) return [];
  // write code here
  let factor1, // 因子1
    factor2, // 因子2
    sqrtNum = Math.floor(Math.sqrt(sum)), // 开平方的结果
    res = [];

  for (factor1 = 2; factor1 <= sqrtNum; factor1++) {
    factor2 = (sum/factor1) % 1;
    if (factor2 % 1 === 0) { // 是他的因子
      // factor2 个 factor1 可以组成sum
      let temp = factor2 >> 1,
        arr = [];
      if (factor2 % 2 === 1) { // 奇数
        if (temp <= factor1) {
          for (let i = factor1-temp; i < factor1 +temp; i++) {
            arr.push(i);
          }
          res.push(arr);
        }
      } else {
        if (temp-1 <= factor1) {
          for (let i = factor1-temp-1; i < factor1 +temp; i++) {
            arr.push(i);
          }
          res.push(arr);
        }
      }
      // 围绕 factor2 的结果
      temp = factor1 >> 1;
      arr = [];
      if (factor1 % 2 === 1) { // 奇数
        for (let i = factor2-temp; i < factor2 + temp; i++) {
          arr.push(i);
        }
        res.push(arr);
      } else {
        for (let i = factor2-temp-1; i < factor2 +temp; i++) {
          arr.push(i);
        }
        res.push(arr);
      }
    }
  }
  return res;
}

console.log(FindContinuousSequence(100));

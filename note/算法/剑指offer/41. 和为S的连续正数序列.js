/**
 * @Author nzq
 * @Date 2019/5/30
 * [和为S的连续正数序列](https://www.nowcoder.com/practice/c451a3fd84b64cb19485dad758a55ebe?tpId=13&tqId=11194&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 小明很喜欢数学,有一天他在做数学作业时,要求计算出9~16的和,他马上就写出了正确答案是100。但是他并不满足于此,他在想究竟有多少种连续的正数序列的和为100(至少包括两个数)。没多久,他就得到另一组连续正数和为100的序列:18,19,20,21,22。现在把问题交给你,你能不能也很快的找出所有和为S的连续正数序列? Good Luck!
 *  输出所有和为S的连续正数序列。序列内按照从小至大的顺序，序列间按照开始数字从小到大的顺序
 * @Param:
 * @Return:
 */

// 思路一：利用因数 复杂度相对于第二种更高
function _FindContinuousSequence(sum)
{
  if (sum<3) return [];
  // write code here
  let res = [];

  for (let i = 1, times = Math.ceil(sum / 2); i <= times; i++) {
    let num = sum/i, // 因子
      half = num>>1,

      arr = [];
    // 奇数个 组成sum
    if (num%1 === 0 && i > half && num%2 !== 0) { // 以当前数为中心
      for (let j = i - half; j <= i + half; j++) {
        arr.push(j);
      }
      arr.length ? res.push(arr) : null;
    }
    arr = [];
    // 偶数个 组成sum
    if ((sum/(i*2+1))%1 === 0 && i>half-1) { // 以当前数和前一个数为中心
      for (let j = i-half+1; j <= i+half; j++) {
        arr.push(j);
      }
      arr.length ? res.push(arr) : null;
    }
  }
  return res;
}

// 思路二：看做从[1,2,...,Math.ceil(num/2)]的数组的尾部开始向头部查找大于的话就unshift，小于的话就pop()
function FindContinuousSequence(sum)
{
  if (sum<3) return [];
  let count=0,
    res = [],
    arr = [];

  for (let i = Math.ceil(sum/2); i >= 1; i--) {
    count+=i;
    arr.unshift(i);

    if (count === sum) {
      res.unshift(arr.slice());
    } else if (count > sum) {
      count -= arr.pop();
    }
  }

  return res;
}
console.log(_FindContinuousSequence(100));

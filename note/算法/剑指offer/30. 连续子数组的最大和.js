/**
 * @Author nzq
 * @Date 2019/5/23
 * [连续子数组的最大和](https://www.nowcoder.com/practice/459bd355da1549fa8a49e350bf3df484?tpId=13&tqId=11183&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: HZ偶尔会拿些专业问题来忽悠那些非计算机专业的同学。今天测试组开完会后,他又发话了:在古老的一维模式识别中,常常需要计算连续子向量的最大和,当向量全为正数的时候,问题很好解决。但是,如果向量中包含负数,是否应该包含某个负数,并期望旁边的正数会弥补它呢？例如:{6,-3,-2,7,-15,1,2,2},连续子向量的最大和为8(从第0个开始,到第3个为止)。给一个数组，返回它的最大连续子序列的和，你会不会被他忽悠住？(子向量的长度至少是1)
 *
 *  https://www.cnblogs.com/TenosDoIt/p/3698246.html
 * @Param:
 * @Return:
 */
// 思路一：穷举 O(n*n)
function _FindGreatestSumOfSubArray(array)
{
  let len = array.length;
  if (len === 0) {
    return 0;
  }
  if (len === 1) {
    return array[0];
  }

  let res = -Infinity, left = 0, right = 0, sum = 0;
  for (let i = 0; i < len; i++) {
    sum = 0;
    for (let j = i; j < len; j++) {
      sum += array[j];
      if (sum > res) {
        res = sum;
        left = i;
        right = j;
      }
    }
  }

  return {res, left, right};
}

// 思路二：动态规划
// 只要F(i-1) 不<=0，就把前面的加上
// F（i）：以array[i]为末尾元素的子数组的和的最大值，子数组的元素的相对位置不变
// F(i) = max(F(i-1), arr[i]);
// res：所有子数组的和的最大值
// res = max(F(i), res) 始终从开始记录 最大的 sum
// https://www.nowcoder.com/questionTerminal/459bd355da1549fa8a49e350bf3df484
function __FindGreatestSumOfSubArray(array)
{
  if (!array.length) {
    return 0;
  }
  if (array.length === 1) {
    return array[0];
  }
  let res = array[0], // 记录当前所有子数组的和的最大值
    sum = array[0],  // 包含array[i]的连续数
    // 组最大值
    left = 0,
    right = 0;

  for (let i = 1, len = array.length; i < len; i++) {
    sum = Math.max(sum + array[i], array[i]);
    res = Math.max(res, sum);
  }
  return res;
}

console.log(__FindGreatestSumOfSubArray([1,-2,3,10,-4,7,2,-5]))

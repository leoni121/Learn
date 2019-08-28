/**
 * @Author nzq
 * @Date 2019/5/30
 * [和为S的两个数字](https://www.nowcoder.com/practice/390da4f7a00f44bea7c2f3d19491311b?tpId=13&tqId=11195&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 输入一个递增排序的数组和一个数字S，在数组中查找两个数，使得他们的和正好是S，如果有多对数字的和等于S，输出两个数的乘积最小的。
    对应每个测试案例，输出两个数，小的先输出。
 * @Param:
 * @Return:
 */

function FindNumbersWithSum(array, sum)
{
  // write code here
  let p1 = 0,
    p2 = array.length-1,
    res = [],
    tempSum = 0;
  while(p1<p2) {
    tempSum = array[p1] + array[p2];
    if (tempSum === sum) {
      res.push([array[p1], array[p2]]);
      p1++;
      p2--;
    } else if (tempSum < sum) {
      p1++;
    } else {
      p2--;
    }
  }
  if (res.length >= 2) {
    let min = Infinity,
      minArr = [];
    res.forEach((cur) => {
      tempSum = cur[0] + cur[1];
      if (min > sum) {
        min = sum;
        minArr[0] = cur[0];
        minArr[1] = cur[1];
      }
    })
    return minArr;
  } else {
    return res;
  }
}

console.log(FindNumbersWithSum([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],21))

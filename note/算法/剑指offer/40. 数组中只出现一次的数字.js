/**
 * @Author nzq
 * @Date 2019/5/30
 * @Description: 一个整型数组里除了两个数字之外，其他的数字都出现了两次。请写程序找出这两个只出现一次的数字。
 * @Param:
 * @Return:
 */

function FindNumsAppearOnce(array)
{
  // write code here
  // return list, 比如[a,b]，其中ab是出现一次的两个数字
  let res = 0;
  for (let i = 0, len = array.length; i < len; i++) {
    res ^= array[i];
  }

  let num = 1;
  while((res&num) !== num) {
    num = num<<1
  }

  let arr1 = [],
    arr2 = [];
  for (let i = 0, len = array.length; i < len; i++) {
    if ((array[i]&num) === 0) {
      arr1.push(array[i])
    } else {
      arr2.push(array[i])
    }
  }

  let a=0,b=0;
  for (let i = 0, len = arr1.length; i < len; i++) {
    a ^= arr1[i];
  }
  for (let i = 0, len = arr2.length; i < len; i++) {
    b ^= arr2[i];
  }
  return [a, b]
}


console.log(FindNumsAppearOnce([4,6]));

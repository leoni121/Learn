/**
 * @Author nzq
 * @Date 2019/4/27
 * @Description: 我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？
 * @Param:
 * @Return:
 */

function rectCover(number)
{
  // write code here
  if (number < 2) {
    return number;
  }
  let pre = 1, next = 1;
  for (let i = 2; i <= number; i++) {
    [pre, next] = [next, next + pre];
  }
  return next
}

console.log(rectCover(6))

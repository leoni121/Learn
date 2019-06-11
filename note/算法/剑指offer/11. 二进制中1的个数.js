/**
 * @Author nzq
 * @Date 2019/4/29
 * @Description: 在底层，负数就是用补码实现的
 *  输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。
 * @Param:
 * @Return:
 */

/*function _NumberOf1(n)
{
  // write code here
  let count = 0;
  // 循环32 次
  while(n) {
    if (n&1) count++;
    n = n>>1;
  }
  return count;
}*/

function NumberOf1(n)
{
  // write code here
  let count = 0
    ,flag = 1;
  // 循环32 次
  while(flag) {
    if (n&flag) count++;
    flag = flag<<1;
  }
  return count;
}
console.log(NumberOf1(-3))

/**
 * @Author nzq
 * @Date 2019/4/27
 * @Description: 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。
 *    f(n-1) = f(0) + f(1)+f(2)+f(3) + ... + f((n-1)-1) = f(0) + f(1) + f(2) + f(3) + ... + f(n-2)
      f(n) = f(0) + f(1) + f(2) + f(3) + ... + f(n-2) + f(n-1) = f(n-1) + f(n-1)
 可以得出：
      f(n) = 2*f(n-1)
 * @Param:
 * @Return:
 */
function jumpFloorII(number)
{
  // write code here
  return 1 << (-- number);
}

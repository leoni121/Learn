/**
 * @Author nzq
 * @Date 2019/4/27
 * [跳台阶](https://www.nowcoder.com/practice/8c82a5b80378478f9484d87d1c5f12a4?tpId=13&tqId=11161&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。
 *
 *
 * 对于本题,前提只有 一次 1阶或者2阶的跳法。

 a.如果两种跳法，1阶或者2阶，那么假定第一次跳的是一阶，那么剩下的是n-1个台阶，跳法是f(n-1);

 b.假定第一次跳的是2阶，那么剩下的是n-2个台阶，跳法是f(n-2)

 c.由a\b假设可以得出总跳法为: f(n) = f(n-1) + f(n-2)

 d.然后通过实际的情况可以得出：只有一阶的时候 f(1) = 1 ,只有两阶的时候可以有 f(2) = 2

 e.可以发现最终得出的是一个斐波那契数列：
 | 1, (n=1)
 f(n) = | 2, (n=2)
 | f(n-1)+f(n-2) ,(n>2,n为整数)

 * @Param:
 * @Return:
 */

/*function jumpFloor(number)
{
  // write code here
  let resultNum = 0,
    tempNum = 0,
    singleNum = 0,
    doubleNum = 0;

  for ( ; singleNum <= number; singleNum++) {
    tempNum = 1;
    doubleNum = (number - singleNum)/2;
    // 除开单步的 还有偶数阶
    if (doubleNum % 1 !== 0) {
      singleNum++;
      doubleNum = Math.floor(doubleNum);
    }

    if (singleNum !== 0 && singleNum !== number) {
      for (let i = 0; i < doubleNum; i++) {
        tempNum *= singleNum + 1
      }
    }

    resultNum += tempNum;
  }

  return resultNum;
}*/

function jumpFloor(number) {
  if (number < 2) {
    return 1;
  }

  let pre = 1, next = 1;
  for (let i = 2; i <= number; i++) {
    [pre, next] = [next, pre + next];
  }

  return next;
}
console.log(jumpFloor(4));

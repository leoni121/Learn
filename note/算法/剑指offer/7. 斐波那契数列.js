/**
 * @Author nzq
 * @Date 2019/4/27
 * [斐波那契数列](https://www.nowcoder.com/practice/c6c7742f5ba7442aada113136ddea0c3?tpId=13&tqId=11160&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description:  大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项（从0开始，第0项为0）。
 n<=39
 * @Param:
 * @Return:
 */

function Fibonacci(n)
{
  // write code here
  let pre = 0,
    next = 1;
  if (n <= 1) {
    return n
  }

  for (let i = 2; i <= n; i++) {
    [pre, next] = [next, pre + next];
  }
  return next;
}

console.log(Fibonacci(10));

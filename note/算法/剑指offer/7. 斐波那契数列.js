/**
 * @Author nzq
 * @Date 2019/4/27
 * @Description:
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

// 其实就是一个 num2 = num1 + num2(原来值)  和  num1 = num2(原来值) 的一个过程
// F(1)=1，F(2)=1, F(n)=F(n-1)+F(n-2)（n>=3，n∈N*）

'use strict';

function fibonacci(n) {
  let num1 = 1;
  let num2 = 1;

  if (n < 3) {
    return 1;
  }
  for (; n>=3; n--) {
    [num2, num1] = [num1 + num2, num2]
  }
  return num2;
}


// 非尾递归， 栈溢出
function fibonacci1(n) {
  if (n <= 2) {
    return 1;
  }

  return fibonacci1(n - 1) + fibonacci1(n - 2)
}


// 尾递归， 栈溢出
function fibonacci2(n, num1 = 1, num2 = 1) {
  if (n <= 2) {
    return num2;
  }

  return fibonacci2(n-1, num2, num2 + num1)
}


console.log(fibonacci(100000));

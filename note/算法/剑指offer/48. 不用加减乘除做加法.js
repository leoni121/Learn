/**
 * @Author nzq
 * @Date 2019/6/4
 * @Description: 写一个函数，求两个整数之和，要求在函数体内不得使用+、-、*、/四则运算符号。
 * @Param:
 * @Return:
 */

// 当同或值为 0 时，跳出循环
function Add(num1, num2)
{
  // write code here
  let sum, carry;
  do {
    sum = num1^num2; // 异或
    carry = (num1&num2) << 1; // 同或
    num1 = sum;
    num2 = carry;
  } while(num2);

  return num1;
}

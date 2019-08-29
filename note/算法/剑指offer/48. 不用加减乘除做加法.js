/**
 * @Author nzq
 * @Date 2019/6/4
 * [不用加减乘除做加法](https://www.nowcoder.com/practice/59ac416b4b944300b617d4f7f111b215?tpId=13&tqId=11201&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 写一个函数，求两个整数之和，要求在函数体内不得使用+、-、*、/四则运算符号。
 * @Param:
 * @Return:
 */

// 当同或值为 0 时，跳出循环
function Add(num1, num2)
{
  do {
    [num1, num2] = [num1^num2, (num1&num2) << 1]
  } while(num2);

  return num1;
}

console.log(Add(1,2))

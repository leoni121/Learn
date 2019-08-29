/**
 * @Author nzq
 * @Date 2019/5/30
 * [左旋转字符串](https://www.nowcoder.com/practice/12d959b108cb42b1ab72cef4d36af5ec?tpId=13&tqId=11196&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 汇编语言中有一种移位指令叫做循环左移（ROL），现在有个简单的任务，就是用字符串模拟这个指令的运算结果。对于一个给定的字符序列S，请你把其循环左移K位后的序列输出。例如，字符序列S=”abcXYZdef”,要求输出循环左移3位后的结果，即“XYZdefabc”。是不是很简单？OK，搞定它！
 * @Param:
 * @Return:
 */

function LeftRotateString(str, n)
{
  // write code here
  if (str.length === 0 || str.length === 1) {
    return str[0] ? str[0] : '';
  }
  let move = n%str.length;
  return str.slice(move) + str.slice(0, move);
}

console.log(LeftRotateString('XYZdefabc', 3));

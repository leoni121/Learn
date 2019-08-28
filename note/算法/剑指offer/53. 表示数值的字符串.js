/**
 * @Author nzq
 * @Date 19-6-15
 * [表示数值的字符串](https://www.nowcoder.com/practice/6f8c901d091949a5837e24bb82a731f2?tpId=13&tqId=11206&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。例如，字符串"+100","5e2","-123","3.1416"和"-1E-16"都表示数值。 但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是。
 * @Param:
 * @Return:
 */


//s字符串
function isNumeric(s)
{
  // write code here
  return /^[-+]?\d*(\.\d+)?([eE][+-]?\d+)?$/.test(s);
}

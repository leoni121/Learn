/**
 * @Author nzq
 * @Date 2019/6/5
 * [把字符串转换成整数](https://www.nowcoder.com/practice/1277c681251b4372bdef344468e4f26e?tpId=13&tqId=11202&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 将一个字符串转换成一个整数(实现Integer.valueOf(string)的功能，
 * 但是string不符合数字要求时返回0)，要求不能使用字符串转换整数的库函数。
 *  数值为0或者字符串不是一个合法的数值则返回0。
 * @Param:
 * @Return:
 */

function StrToInt(str)
{
  // write code here
  let res = 0;
  if ((res = str.match(/^([+-]?)(\d+)(\.\d+)?$/))) {
    return res[1] === '-' ? res[2]*-1 : res[2];
  }
  return 0;
}

console.log(StrToInt('-100'));

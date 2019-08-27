/**
 * @Author nzq
 * @Date 2019/4/29
 * [数值的整数次方](https://www.nowcoder.com/practice/1a834e5e3e1a4b7ba251417554e07c00?tpId=13&tqId=11165&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 给定一个double类型的浮点数base和int类型的整数exponent。求base的exponent次方。
 * @Param:
 * @Return:
 */

function _Power(base, exponent)
{
  // write code here
  return Math.pow(base, exponent);
}

// 参考网友
function Power (base, exponent) {
  if (exponent === 0) return 1;
  if (exponent === 1) return base;
  let isNegative = false; // exponent 是非负数

  if (exponent < 0) {
    exponent = -exponent;
    isNegative = true;
  }
  let pow = 0;
  if (exponent % 2 === 0) {
    pow = Power(base, exponent/2);
    pow *= pow;
  } else {
    pow = Power(base, exponent-1) * base;
  }

  return isNegative ? 1/pow : pow;
}

console.log(Power(2, 4));

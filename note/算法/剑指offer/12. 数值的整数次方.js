/**
 * @Author nzq
 * @Date 2019/4/29
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
  if (exponent < 0) {
    if (base === 0) {
      throw new Error('分母不能为0');
    } else {
      if (-exponent % 2 === 1) {
        return 1/(Power(base, -exponent-1) * base)
      } else {
        return 1/ (Power(base, -exponent/2) * Power(base, -exponent/2))
      }
    }
  } else if (exponent === 0) {
    return 1;
  } else {
    if (exponent % 2 === 1) {
      return Power(base, exponent - 1) * base;
    } else {
      return Power(base, exponent/2) * Power(base, exponent/2);
    }
  }
}

/**
 * @Author nzq
 * @Date 2019-08-28
 * @Description:
 * @Param:
 * @Return:
 */

function bigNumMulti(num1, num2) {
  let arr1 = [...num1.toString()],
    res = '',
    idx = 0;
  while(arr1.length) {
    res = bigNumAdd(fillZero(bigOneNumMulti(num2, ~~arr1.pop()), idx++), res);
  }
  return res;
}

// 实现 乘10*idx
function fillZero (str, num) {
  for (let i = 0; i < num; i++) str += '0';
  return str;
}
// 一个一位数和一个大数相乘
function bigOneNumMulti (bigNum, num) {
  if (!num || !bigNum) return '0';
  let arr1 = [...bigNum.toString()],
    temp = 0, // 进位
    res = ''; // 结果

  while (arr1.length || temp) {
    temp += ~~arr1.pop() * num;
    res = (temp%10) + res;
    temp = Math.floor(temp/10);
  }
  return res;
}
// 大数相加
function bigNumAdd(num1, num2) {
  let arr1 = [...num1.toString()],
    arr2 = [...num2.toString()],
    temp = 0, // 进位
    res = ''; // 结果

  while (arr1.length || arr2.length || temp) {
    temp += ~~arr1.pop() + ~~arr2.pop();
    res = (temp%10) + res;
    temp = temp > 9 ? 1 : 0;
  }
  return res;
}

console.log(bigNumMulti(100, 1234));

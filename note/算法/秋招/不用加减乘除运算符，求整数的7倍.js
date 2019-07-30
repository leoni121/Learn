/**
 * @Author nzq
 * @Date 2019-07-29
 * @Description:
 * @Param:
 * @Return: [第 102 题：不用加减乘除运算符，求整数的7倍 ](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/161)
 */

// ((m & n)<<1) + (m ^ n) === m + n
// 先定义位运算加法
function bitAdd(m, n){
  while(m){
    [m, n] = [(m & n) << 1, m ^ n];
  }
  return n;
}
// 位运算实现方式 1 - 循环累加7次
let multiply7_bo_1 = (num)=>
{
  let sum = 0,counter = new Array(7); // 得到 [empty × 7]
  while(counter.length){
    sum = bitAdd(sum, num);
    counter.shift();
  }
  return sum;
}

// 位运算实现方式 2 - 二进制进3位(乘以8)后，加自己的补码(乘以-1)
let multiply7_bo_2 = (num) => bitAdd(num << 3, -num) ;

console.log(multiply7_bo_1(8));

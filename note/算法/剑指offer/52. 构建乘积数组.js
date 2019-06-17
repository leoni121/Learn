/**
 * @Author nzq
 * @Date 19-6-15
 * @Description: 给定一个数组A[0,1,...,n-1],请构建一个数组B[0,1,...,n-1],其中B中的元素B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]。不能使用除法。
 * @Param:
 * @Return:
 */


// 第一次循环计算前一部分
// 第二次循环计算后面部分
function multiply(array) {
  // write code here
  let len = array.length,
    temp = 1,
    res = [1];
  if (len === 0) return [];

  // res[0] 已经有值
  for (let i = 1; i < len; i++) {
    res[i] = res[i-1] * array[i-1];
  }

  for (let i = len - 1; i >= 0; i--) {
    res[i] *= temp;
    temp*=array[i];
  }

  return res;
}

console.log(multiply([1,2,3]));

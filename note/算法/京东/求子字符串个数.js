/*问题描述：给定字符串求字符串的子串个数

解决思路：假设字符串str="abcdef";求子串可以看成将该字符串分割成不同的字符串，需要两个分隔符即可实现。

a|bc|def 设字符串长度为n，第一个分隔符有n+1种放法，第二个有n种放法。由于两个分隔符互换位置结果相同，所以需要折半，再加上空串所以个数为：n(n+1)/2+1。*/

function getNumOfSubStr(str) {
  let temobj = {}
    ,length = str.length
    ,temStr = ""
    ,count = 0;
  if (length === 0) {
    return count;
  }

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length && length - j >= i; j++) {
      temStr = str.substr(j, i+1);
      if (!temobj[temStr]) {
        temobj[temStr] = 1;
        count++;
      }
    }
  }

  return {count, temobj}

}
// 从 0 一直累加到 total
/*(function count (total = 10,num2 = total) {
  if(total===0) {
    return num2;
  }
  --total
  return count(total, num2 + total)
})(10)*/

// console.log(getNumOfSubStr("UP! UP! JD"))
console.log(getNumOfSubStr("UP！UP！JD"))

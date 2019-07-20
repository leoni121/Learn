/**
 * @Author nzq
 * @Date 2019/5/22
 * @Description: 输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。
 * @Param:
 * @Return:
 */

function Permutation(str)
{
  let result = [],
    temp = "",
    arr = str.split("");
  // write code here
  return (function _Permutation (start) {
    if (start === arr.length-1) {
      temp = Array.from(arr).join("");
      result.indexOf(temp) === -1 ? result.push(temp) : null;
    } else {
      for (let idx = start, len = arr.length; idx < len; idx++) {
        [arr[start], arr[idx]] = [arr[idx], arr[start]];
        _Permutation(start+1);
        [arr[start], arr[idx]] = [arr[idx], arr[start]];
      }
    }
    return result;
  })(0).sort();
}


console.log(Permutation("abc"));

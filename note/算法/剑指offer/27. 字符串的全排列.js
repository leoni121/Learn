/**
 * @Author nzq
 * @Date 2019/5/22
 * [字符串的排列](https://www.nowcoder.com/practice/fe6b651b66ae47d7acce78ffdd9a96c7?tpId=13&tqId=11180&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串abc,acb,bac,bca,cab和cba。
 * @Param:
 * @Return:
 */

// 思路一
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


// 思路二：字典排序：
//       第一步：从右至左找第一个左邻小于右邻的数，记下位置i，值list[a]（左边的数）
//       第二部：从右边往左找第一个右边大于list[a]的第一个值，记下位置j，值list[b] （右边第一个大于list[a]的数）
//       第三步：交换list[a]和list[b]的值
//       第四步：将i以后的元素重新按从小到大的顺序排列

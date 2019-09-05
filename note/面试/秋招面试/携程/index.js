/**
 * @Author nzq
 * @Date 19-9-4
 * @Description:
 * @Param:
 * @Return:
 */


/*时间限制：C/C++语言 1000MS；其他语言 3000MS
内存限制：C/C++语言 65536KB；其他语言 589824KB
题目描述：
给定两个字符串，字符串不区分大小写，找出其中最长的公共连续子串，输出其长度

输入
输入为两行字符串，长度均小于等于100，字符串不区分大小写

输出
输出为一个整数，表示最长公共连续子串的长度。


样例输入
abcd
abdde
样例输出
2

规则*/




/*请完成下面这个函数，实现题目要求的功能
当然，你也可以不按照下面这个模板来作答，完全按照自己的想法来 ^-^
******************************开始写代码******************************/
function longestSubStrLength(s1, s2) {
  let str1 = s1.toLowerCase()
    ,str2 = s2.toLowerCase();

  if(str1.length === 0 || str2.length === 0) return '';
  let x = str1.length,
    y = str2.length,
    record  = [],
    max = [0, 0];

  // 初始化 vector
  for(let i = 0; i < y; i++) {
    record[i] = [];
  }

  for(let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      if (str2[i] === str1[j]) {
        if (i === 0 || j === 0) {
          record[i][j] = 1;
        } else {
          record[i][j] = 1 + (record[i - 1][j - 1] ? record[i - 1][j - 1] : 0);
        }
        console.log(record[i][j], record[max[0]][max[1]], max)
        if (record[i][j] > record[max[0]][max[1]]) {
          max = [i, j];
        }
      } else {
        record[i][j] = 0;
      }
    }
  }

  return record[max[0]][max[1]]
}
/******************************结束写代码******************************/



var res;

/*
var _s1 = read_line();
var _s2 = read_line();
*/

res = longestSubStrLength('abcd', 'abdde');
print(res);


/*App版本号大小比较
时间限制：C/C++语言 1000MS；其他语言 3000MS
内存限制：C/C++语言 65536KB；其他语言 589824KB
题目描述：
实现一个比较App版本号大小的函数，版本号由数字和.组成，包含2位或者3位，例如：5.2.0、5.10、6.2.1等

输入
输入两个版本号

输出
将两个版本号按从小到大顺序输出，用逗号分隔


样例输入
5.2.0
5.10
样例输出
5.2.0,5.10*/




/*请完成下面这个函数，实现题目要求的功能
当然，你也可以不按照下面这个模板来作答，完全按照自己的想法来 ^-^
******************************开始写代码******************************/
function sortVersion(s1, s2) {
  let s1Arr = s1.split("."),
    s2Arr = s2.split("."),
    len = s1Arr.length > s2Arr.length ? s1Arr.length : s2Arr.length;
  for (let i = 0; i < len; i++) {
    if (~~s1Arr[i] < ~~s2Arr[i]) {
      return s1+','+s2
    } else if (~~s1Arr[i] > ~~s2Arr[i]) {
      return s2+','+s1;
    }
  }
  return s1+','+s2;
}
/******************************结束写代码******************************/


var res;

/*_s1var _s1 = read_line();
var _s2 = read_line();*/

res = sortVersion('5.2.0','5.10');
print(res);

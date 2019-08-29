/**
 * @Author nzq
 * @Date 2019/5/27
 * [把数组排成最小的数](https://www.nowcoder.com/practice/8fecd3f8ba334add803bf2a06af1b993?tpId=13&tqId=11185&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。例如输入数组{3，32，321}，则打印出这三个数字能排成的最小数字为321323。
 * @Param:
 * @Return:
 */

// mine
// 思路一：全排列
function _PrintMinNumber(numbers)
{
  // write code here
  if (numbers && numbers.length <= 1) {
    return numbers.length === 1 ? numbers[0] : '';
  }

  return getMinNumber(numbers, 0);
}

function getMinNumber (arr, index) {
  let min = Infinity;
  if (index === arr.length-1) {
    min = arr.reduce((pre, cur, idx, array) => {
      return pre + '' + cur;
    })
  } else {
    for (let i = index, len = arr.length; i < len; i++) {
      [arr[index], arr[i]] = [arr[i], arr[index]];
      min = Math.min(getMinNumber(arr, index+1), min);
      [arr[index], arr[i]] = [arr[i], arr[index]];
    }
  }
  return +min;
}

// 思路二：利用 JS 的 sort
function PrintMinNumber(numbers)
{
  // write code here
  if (numbers && numbers.length <= 1) {
    return numbers.length === 1 ? numbers[0] : '';
  }
  return numbers.sort((pre, next) => {
    return (pre + '' + next) - (next + '' + pre);
  }).join('');
}

// 思路三：全部转化成一样长的字符串，不一样长的就添加"#"，"#" 大于任何数字。
console.log(_PrintMinNumber([3,5,1,4,2]))
console.log(_PrintMinNumber( [3, 32, 321]))

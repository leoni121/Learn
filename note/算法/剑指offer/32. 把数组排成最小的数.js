/**
 * @Author nzq
 * @Date 2019/5/27
 * @Description: 输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。例如输入数组{3，32，321}，则打印出这三个数字能排成的最小数字为321323。
 * @Param:
 * @Return:
 */

// mine
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

// 参考
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

console.log(PrintMinNumber([3,5,1,4,2]))

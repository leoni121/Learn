/**
 * @Author nzq
 * @Date 2019/4/29
 * [调整数组顺序使奇数位于偶数前面](https://www.nowcoder.com/practice/beb5aa231adc45b2a5dcc5b62c93f593?tpId=13&tqId=11166&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有的奇数位于数组的前半部分，所有的偶数位于数组的后半部分，并保证奇数和奇数，偶数和偶数之间的相对位置不变。
 * @Param:
 * @Return:
 */

// 思路一： 两个数组
function reOrderArray(array)
{
  // write code here
  let len = array.length;
  if (len<=1) {
    return array;
  }
  let oddArr = []
    ,evenArr = [];
  for (let i = 0; i < len; i++) {
    // 奇数
    if (array[i] % 2 === 1) {
      oddArr.push(array[i]);
    } else {
      evenArr.push(array[i]);
    }
  }

  return oddArr.concat(evenArr);
}

// 思路二：一个数组，记录奇数个数，两个指针分别 ++ 操作。插入排序
// 思路三：利用冒泡，O（n*n）,每次把偶数后移

/**
 * @Author nzq
 * @Date 2019/5/22
 * [数组中出现次数超过一半的数字](https://www.nowcoder.com/practice/e8a1b01a2df14cb2b228b30ee6a92163?tpId=13&tqId=11181&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。
 * @Param:
 * @Return:
 */

// 思路一：利用 JS 对象记录个数
function _MoreThanHalfNum_Solution(numbers)
{
  // write code here
  let obj = {},
    len = numbers.length;
  if (len === 0) {
    return 0;
  }
  for (let i = 0; i < len; i++) {
    if (obj[numbers[i]]) {
      obj[numbers[i]] ++;
    } else {
      obj[numbers[i]] = 1;
    }
  }
  for (let key in obj) {
    if (obj[key] > len/2) {
      return key;
    }
  }
  return 0;
}


// 思路二：数组排序后，如果符合条件的数存在，则一定是数组中间那个数。（比如：1，2，2，2，3；或2，2，2，3，4；或2，3，4，4，4等等）这种方法虽然容易理解，但由于涉及到快排sort，其时间复杂度为O(NlogN)并非最优；

// 思路三：如果有符合条件的数字，则它出现的次数比其他所有数字出现的次数和还要多。
// 在遍历数组时保存两个值：一是数组中一个数字，一是次数。遍历下一个数字时，若它与之前保存的数字相同，则次数加1，否则次数减1；若次数为0，则保存下一个数字，并将次数置为1。遍历结束后，所保存的数字即为所求。然后再判断它是否符合条件即可。
// count/result 就是记录对应数字 和 数字抵消后的个数
function MoreThanHalfNum_Solution(numbers)
{
  // write code here
  let len = numbers.length;
  if (len === 0) {
    return 0;
  }
  let result = numbers[0], count = 1;
  for (let i = 1; i < len; i++) {
    if (numbers[i] === result) {
      count++;
    } else {
      count--;
    }
    if (count === 0) {
      result = numbers[i];
      count = 1;
    }
    console.log('count:', count)
  }
  // Verifying
  count = 0;
  for (let i = 0; i < len; i++) {
    if (numbers[i] === result) count++;
  }
  return count > len/2 ? result : 0;
}
console.log(MoreThanHalfNum_Solution([1,3,2,2,2,4,4,2,2]))

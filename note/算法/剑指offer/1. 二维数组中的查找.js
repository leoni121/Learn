/**
 * @Author nzq
 * @Date 2019/4/15
 * [二维数组中的查找](https://www.nowcoder.com/practice/abc3fe2ce8e146608e868a70efebf62e?tpId=13&tqId=11154&tPage=1&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 * @Param:
 * @Return:
 */
function Find(target, array) {
  let temArr;
  let aLen = array && array[0] && array[0].length;
  for (let i = 0, len = array.length; i < len; i++) {
    if (array[i][0] <= target && target <= array[i][aLen-1]) {
      temArr = array[i];
      break;
    }
  }
  return temArr.indexOf(target) > -1
}

/** 思路
 * 矩阵是有序的，从左下角来看，向上数字递减，向右数字递增，
 * 因此从左下角开始查找，当要查找数字比左下角数字大时。右移
 * 要查找数字比左下角数字小时，上移
 */

// [
//     [1,2,3,4,5],
//     [6,7,8,9,10],
//  ]
// a.toString() "1,2,3,4,5,6,7,8,9,10"
// a.toString().indexOf(7) > -1

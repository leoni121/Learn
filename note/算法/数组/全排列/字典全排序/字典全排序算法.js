/**
 * @Author nzq
 * @Date 2019/3/20
 * @Description: 参考https://blog.csdn.net/qq_34672688/article/details/79557380, 全排序
 *  字典排序：
      第一步：从右至左找第一个左邻小于右邻的数，记下位置i，值list[a]（左边的数）
      第二部：从右边往左找第一个右边大于list[a]的第一个值，记下位置j，值list[b] （右边第一个大于list[a]的数）
      第三步：交换list[a]和list[b]的值
      第四步：将i以后的元素重新按从小到大的顺序排列
 * @Param:
 * @Return:
 */
function permutation(arr) {
  let tempArr = arr.slice(0),
    len = tempArr.length,
    times = 1 // 排列次数
    ,
    a = 0 // 左邻小于右邻的数的位置
    ,
    b = 0; // 从右边往左找第一个右边大于tempArr[a]的第一个的位置

  // 算出需要执行的次数，即全排列的次数，共n！种排法
  for (let i = 1; i <= len; i++) {
    times *= i;
  }
  tempArr.sort()
  console.log(times);

  // 循环 times 次
  for (let i = 1; i <= times; i++) {

    // 左邻小于右邻
    for (let j = len - 1; j > 0; j--) {
      if (tempArr[j - 1] < tempArr[j]) {
        a = j - 1;
        break;
      }
    }

    // 右边往左找第一个右边大于tempArr[a]的第一个的位置
    for (let j = len - 1; j >= 0; j--) {
      if (tempArr[j] > tempArr[a]) {
        b = j;
        break;
      }
    }

    // 交换
    [tempArr[a], tempArr[b]] = [tempArr[b], tempArr[a]]

    // 排序　i（list[a]）　以后的数
    tempArr = tempArr.concat(tempArr.splice(a + 1).sort((pre, cur) => pre - cur))
    console.log(tempArr, i);
  }
}

permutation([1, 2, 3, 4])
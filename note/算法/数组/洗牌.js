/**
 * @Author nzq
 * @Date 19-9-4
 * @Description: [使用 洗牌算法实现 数组乱序](https://blog.csdn.net/lajiqianxx/article/details/82018181)
 * @Param:
 * @Return:
 */
//　思路一：每次抽取一张牌放入桌子上面
function ___shuffle(array) {
  let copy = [],
    n = array.length,
    i;
  // 如果还剩有元素则继续。。。
  while (n) {
    // 随机抽取一个元素
    i = Math.floor(Math.random() * array.length);
    // 如果这个元素之前没有被选中过。。
    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      n--;
    }
  }
  return copy;
}


//　思路二：用Array的splice()方法将其从目标数组中移除同时也更新了目标数组的长度，如此一来下次遍历的时候是从新的长度开始
function __shuffle(array) {
  let copy = [],
    n = array.length,
    i;
  // 如果还剩有元素。。
  while (n) {
    // 随机选取一个元素
    i = Math.floor(Math.random() * n--);
    // 移动到新数组中
    copy.push(array.splice(i, 1)[0]);
  }
  return copy;
}

//　思路三：交换
function _shuffle(array) {
  let m = array.length,
    t, i;
  // 如果还剩有元素…
  while (m) {
    // 随机选取一个元素…
    i = Math.floor(Math.random() * m--);
    // 与当前元素进行交换
    [array[m], array[i]] = [array[i], array[m]];
  }
  return array;
}

//　思路三：
function shuffle(array) {
  return array.sort(function() {
    return Math.random() - 0.5
  });
}

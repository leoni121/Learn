// 从第一个开始一个一个向后比对、交换
// 改进了的冒泡排序
function sort (arr) {
  let len = arr.length
    ,mark;
  for (let i = 0; i < len - 1; i++) {
    mark = 0;
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        mark = 1;
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
    if (!mark) {
      break
    }
  }
  return arr
}

console.log(sort([1,2,4,10,-2,3,-10,20]))

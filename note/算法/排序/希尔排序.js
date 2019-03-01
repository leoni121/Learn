/*// 先分为若干子序（通过间隔， 间隔逐渐缩小为1），再分别进行插入排序
function sort (arr) {
  let grap = 1
    ,len = arr.length
    ,cur
    ,j;

  while(grap<len / 3) {
    grap = grap*3 +1
  }
  for (grap; grap > 0; grap = Math.floor(grap / 3)) {
    for (let i = grap; i < len; i++) {
      cur = arr[i];
      for (j = i - grap; j >= 0 && arr[j] > cur; j -= grap) {
        arr[j + grap] = arr[j];
      }
      arr[j + grap] = cur;
      console.log(arr)
    }
  }
  return arr
}*/

function sort (arr) {
  let len = arr.length
    ,gap = 1
    ,temp = 0
    ,j = 0;
  while (gap < len / 3) {
    gap = gap * 3 + 1
  }

  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      temp = arr[i];
      // 不加 j >= 0 也行 arr[-*] > temp => false
      for (j = i - gap; arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp
    }
  }

  return arr
}

function getRandomArr(sum,start, end) {
  let arr = [];
  for (let i =0;i<sum;i++) {
    arr.push(Math.round(Math.random()*(end-start)) + start);
  }
  return arr;
}

console.log(sort(getRandomArr(20, -100, 100)))


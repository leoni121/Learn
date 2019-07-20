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

function sort(arr) {
  let len = arr.length;
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      let cur = arr[i];
      let idx = i - gap;
      while (cur<arr[idx] && idx >=0) {
        arr[idx+gap] = arr[idx];
        idx -= gap;
      }
      arr[idx + gap] = cur;
    }
  }
  return arr;
}

function getRandomArr(sum,start, end) {
  let arr = [];
  for (let i =0;i<sum;i++) {
    arr.push(Math.round(Math.random()*(end-start)) + start);
  }
  return arr;
}

console.log(sort(getRandomArr(20, -100, 100)))


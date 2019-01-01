// 先分为若干子序（通过间隔， 间隔逐渐缩小为1），再分别进行插入排序
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
}

console.log(sort([1,100, 2,4,10,-2,3,-10,20]))


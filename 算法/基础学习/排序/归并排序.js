// 建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。先将其划分为若干最小块，将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序  小 =》 大
function mergeSort (arr) {
  let len = arr.length;
  if (len < 2) {
    return arr
  }
  let midle = Math.ceil(len / 2)
    ,left = arr.slice(0, midle)
    ,right = arr.slice(midle);
  return merge(mergeSort(left), mergeSort(right))
}

function merge (left, right) {
  let _arr = [];
  while(left.length>0 && right.length>0) {
    if (left[0] <= right[0]) {
      _arr.push(left.shift());
    } else {
      _arr.push(right.shift());
    }
  }

  if (left.length > 0) {
    _arr = _arr.concat(left)
  }

  if (right.length > 0) {
    _arr = _arr.concat(right);
  }
  console.log(_arr)
  return _arr;
}
console.log(mergeSort([1,100,-100, 2,4,10,-2,3,-10,20]))
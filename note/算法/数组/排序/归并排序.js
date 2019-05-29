function mergeSort(arr) {
  let len = arr.length;
  if (len < 2) {
    return arr;
  }
  let middle = Math.floor(len / 2)
    ,left = arr.slice(0, middle)
    ,right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right))
}

function merge (left, right) {
    let temArr = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0] > right[0]) {
      temArr.push(right.shift());
    } else {
      temArr.push(left.shift());
    }
  }
  if (left.length > 0) {
    return temArr.concat(left);
  } else if (right.length > 0) {
    return temArr.concat(right)
  } else {
    return temArr
  }
}
console.log(mergeSort([1,100,-100, 2,4,10,-2,3,-10,20]))

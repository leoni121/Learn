function quickSort (arr, left = 0, right = arr.length-1) {
  let splitIndex;
  if (left < right) {
    splitIndex = partition(arr, left, right);
    quickSort(arr, left, splitIndex - 1);
    quickSort(arr, splitIndex+1, right);
  }
  return arr;
}

function partition (arr, left, right) {
  let pivot = left; // 设置的基准值
  while(1) {
    while(left<right && arr[right]>=arr[pivot]) {
      right--;
    }
    while(left<right && arr[left]<=arr[pivot]) {
      left++;
    }
    if(left<right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
    } else {
      break;
    }
  }
  [arr[left],arr[pivot]] = [arr[pivot], arr[left]];
  return left;
}

// 先找到最开始的为基准，遍历这个基准之后的。i = index。交换的时候index可以理解是在这个数组中大于“基准的”数，且在最左边，交换后index++
// function partition(arr, left ,right) {     // 分区操作
//   var pivot = left,                      // 设定基准值（pivot）
//     index = pivot + 1;
//   for (var i = index; i <= right; i++) {
//     if (arr[i] < arr[pivot] && i !== index) {
//       swap(arr, i, index);
//       index++;
//     }
//   }
//   swap(arr, pivot, index - 1);
//   return index-1;
// }
// function swap(arr, i, j) {
//   var temp = arr[i];
//   arr[i] = arr[j];
//   arr[j] = temp;
// }

function getRandomArr(sum,start, end) {
  let arr = [];
  for (let i =0;i<sum;i++) {
    arr.push(Math.random()*(end-start) + start);
  }
  return arr;
}


console.log(quickSort(getRandomArr(130,30,1000)))


function quickSort (arr, left = 0, right = arr.length-1) {
  let splitIndex;
  if (left < right) {
    // splitIndex = partition(arr, left, right);
    splitIndex = partition1(arr, left, right);
    quickSort(arr, left, splitIndex - 1);
    quickSort(arr, splitIndex+1, right);
  }
  return arr;
}

// partition 排列之后返回当前这一轮中 基准再数组中的位置 ， 从大到小
// 第一个为基准（arr[0]）,从两边开始找， 找到右边小于arr[0]， 左边大于arr[0]的数交换之后再找,找完之后将最靠右的小于arr[0]的 和其交换；
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

function partition1 (arr, left, right) {
  let pivot = left
    ,index = pivot + 1; // 用于记录“已完成排列的最靠左且大于 基准的位置”

  for (let i = index; i <= right; i++) {
    if (arr[pivot] > arr[i]) {
      if (index !== i) {
        [arr[i], arr[index]] = [arr[index], arr[i]];
      }
      index ++;
    }
  }
  [arr[pivot], arr[index-1]] = [arr[index-1], arr[pivot]];

  return index-1;
}

function getRandomArr(sum,start, end) {
  let arr = [];
  for (let i =0;i<sum;i++) {
    arr.push(Math.random()*(end-start) + start);
  }
  return arr;
}


console.log(quickSort(getRandomArr(30,30,1000)))


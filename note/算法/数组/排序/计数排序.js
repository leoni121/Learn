function countingSort(arr) {
  let len = arr.length
    ,max = arr[0]
    ,countArr = [];

  // 寻找最大和最小 的index
  for (let i = 1; i < len; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  // 得到相应的大小
  countArr.length = max + 1;
  countArr.fill(0);
  // 技术开始
  for (let i = 0; i < len; i++) {
    countArr[arr[i]]++;
  }
  // 还原
  for (let i = 0, j = 0, len = countArr.length; i < len; i++) {
    for (let k = 0; k < countArr[i]; k++) {
      arr[j] = i;
      j++;
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


console.log(countingSort(getRandomArr(20, 1,100)))
// 从i=1 开始，默认i=0是有序，和前面序列比较找到合适位置插入

function insertSort(arr) {
    let len = arr.length
      ,temArr = [arr[0]];
    for (let i = 1; i < len; i++) {
        let j = i-1;
        for (; j >= 0 && arr[i] < temArr[j]; j--) {
          temArr[j + 1] = temArr[j];
        }
      temArr[j + 1] = arr[i];
    }
    return temArr
}

function getRandomArr(sum,start, end) {
  let arr = [];
  for (let i =0;i<sum;i++) {
    arr.push(Math.round(Math.random()*(end-start)) + start);
  }
  return arr;
}

console.log(insertSort(getRandomArr(20, -100, 100)))

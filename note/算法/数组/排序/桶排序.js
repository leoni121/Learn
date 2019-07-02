function bucketSort(arr, bucketSize = 5) {
  if (arr.length < 2) {
    return arr;
  }

  /* 获取最大最小值 */
  let minValue = arr[0],
      maxValue = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < minValue) {
      minValue = arr[i];
    } else if (arr[i] > maxValue) {
      maxValue = arr[i];
    }
  }

  // 桶的初始化
  let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1 //　桶数量
      ,buckets = new Array(bucketCount);　//　装桶的数组

  for (let i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }

  // 利用映射函数将数据分配到各个桶中
  for (let i = 0; i < arr.length; i++) {
    //　根据数值范围放入相应的桶里面
    buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
  }

  /* 排序 */
  arr = [];
  for (let i = 0; i < buckets.length; i++) {
    insertSort(buckets[i]);                      // 对每个桶进行排序，这里使用了插入排序
    arr = arr.concat(buckets[i]);
  }

  return arr;
}


function insertSort(arr) {
  let len = arr.length,
      temArr = [arr[0]],
      j;
  for (let i = 1; i < len; i++) {
    j = i - 1;
    for (; j >= 0 && arr[i] < temArr[j]; j--) {
      temArr[j + 1] = temArr[j];
    }
    temArr[j + 1] = arr[i];
  }
  return temArr
}


function getRandomArr(sum, start, end) {
  let arr = [];
  for (let i = 0; i < sum; i++) {
    arr.push(Math.random() * (end - start) + start);
  }
  return arr;
}

// console.log(countingSort(getRandomArr(10, 10, 100)));
console.log(bucketSort(getRandomArr(10, 10, 100)));

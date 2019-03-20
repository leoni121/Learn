// 插入排序
function insertSort (arr) {
  let len = arr.length
    ,preindex
    ,cur;
  for (let i = 1; i < len; i++) {
    preindex = i - 1;
    cur = arr[i];
    while(arr[preindex]>cur && preindex>=0) {
      arr[preindex + 1]  = arr[preindex];
      preindex--;
    }
    arr[preindex+1] = cur
  }
  console.log(arr)
  return arr
}

// 桶排序，一个桶相当于这个数组中的数的一个区间，不同范围的数在不同的桶，然后不同的桶内再排序，再对桶排序
function bucketSort (arr, len = arr.length) {
  const DEFAULT_BUCKET_SIZE = 5; // 桶大小,决定了这个桶最大数和最小数的最大的可能的差为 多少
  let min = arr[0]
    ,max = arr[0]
    ,bucketSize = DEFAULT_BUCKET_SIZE //
    ,bucketCount
    ,bucketArr = [];

  for (let i = 1; i < len; i++) {
    if (arr[i] < min) {
      min = arr[i];                // 输入数据的最小值
    } else if (arr[i] > max) {
      max = arr[i];                // 输入数据的最大值
    }
  }
  // 桶和桶的数组初始化
  bucketCount = Math.floor((max - min) / bucketSize) + 1
  for (let i = 0; i < bucketCount; i++) {
    bucketArr[i]=[];
  }

  // 利用映射函数将数据分配到各个桶中
  for (let i = 0; i < arr.length; i++) {
    bucketArr[Math.floor((arr[i] - min) / bucketSize)].push(arr[i]);
  }

  arr = []; // 清空arr
  for (let i = 0; i < bucketArr.length; i++) {
    insertSort(bucketArr[i]);                      // 对每个桶进行排序，这里使用了插入排序
    for (let j = 0; j < bucketArr[i].length; j++) {
      arr.push(bucketArr[i][j]);
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


console.log(bucketSort(getRandomArr(20, 1,100)))

function radixSort(arr, maxDigit) {
  let counter = [];
  console.log(arr);
  for (let i = 0, mod = 10, dev = 1; i < maxDigit; i++, dev *= 10, mod *= 10) {
    /* 将对应位上的数字放入对应的　bucket */
    for(let j = 0; j < arr.length; j++) {
      //　得到对应位上的数字
      let bucket = parseInt((arr[j] % mod) / dev);
      if(!counter[bucket]) counter[bucket] = [];
      counter[bucket].push(arr[j]);
    }

    /* 将所有桶里面的数字放回 */
    let value = null;
    for(let j = 0, pos = 0; j < counter.length; j++) {
      value = null;
      if(counter[j]) {
        while ((value = counter[j].shift())) {
          arr[pos++] = value;
        }
      }
    }
  }
  return arr;
}


function getRandomArr(sum, start, end) {
  let arr = [];
  for (let i = 0; i < sum; i++) {
    arr.push(Math.floor(Math.random() * (end - start) + start));
  }
  return arr;
}

// console.log(countingSort(getRandomArr(10, 10, 100)));
console.log(radixSort(getRandomArr(10, 10, 100), 3));

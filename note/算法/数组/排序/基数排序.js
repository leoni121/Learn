/**
 * @author Nzq
 * @date 2019/3/14
 * @Description: 循环最大数得位数遍，从各位开始排， 拍完一次返回在排
 * @Param: maxDigit 最大的位数
*/
function radixSort(arr, maxDigit) {
  let mod = 10
    ,dev = 1
    ,counter = []
    ,index; // 用于更新arr

  for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    counter = [];
    for(let j = 0; j < arr.length; j++) {
      let bucket = Math.floor((arr[j] % mod) / dev);
      if(!counter[bucket]) {
        counter[bucket] = [];
      }
      counter[bucket].push(arr[j]);
    }

    index = 0;
    for(let j = 0; j < counter.length; j++) {
      // 遍历这一列统一基数的数
      if(counter[j]) {
        for (let i = 0, len = counter[j].length; i < len; i++) {
          arr[index++] = counter[j][i]
        }
      }
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


console.log(radixSort(getRandomArr(30, 10,99), 2))

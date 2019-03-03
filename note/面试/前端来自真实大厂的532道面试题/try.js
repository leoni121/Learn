function sort(arr) {
  var len = arr.length;
  if (len <= 3) {
    return arr.sort();
  }

  var i = 0 // 记录0 的位置
    ,j = 0 // 记录1的位置
    ,k = len-1; // 记录2的位置

  while (i <= j && i <= k && j <= k) {
    while (arr[i] === 0) {
      i++;
    }
    while (arr[j] === 1) {
      j++;
    }
    while (arr[k] === 2) {
      k--;
    }

    if (i <= k && arr[i] === 2 && arr[k] === 0) {
      [arr[i], arr[k]] = [arr[k], arr[i]];
      i++;j--;
    } else if (j <= k && arr[j] === 2 && arr[k] === 1) {
      [arr[j], arr[k]] = [arr[k], arr[j]];
      j++;
      k--;
    } else if (i <= j && arr[i] === 1 && arr[j] === 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j++;
    } else if (i < j && j < k) {
      arr[i] = 0;
      arr[j] = 1;
      arr[k] = 2;
      i++;j++;j--;
    }

    if (i > j) {
      j = i;
    }
  }

  return arr
}


console.log(sort([1,1,1,0,2,0,2,1,0,2,1,0]))

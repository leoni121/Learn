// 选择排序
function sort (arr) {
  let len = arr.length;

  // 根据传入的i节点的位置调整一 i 为根节点的子树
  function heapify (arr, i) {
    let lChildIdx = 2 * i + 1 // 左孩子
      ,rChildIdx = 2 * i + 2  // 右孩子
      ,maxIdx = i;          // 此时设父节点为最大

    if (lChildIdx<len && arr[lChildIdx]>arr[maxIdx]) {
      maxIdx = lChildIdx;
    }
    if (rChildIdx<len && arr[rChildIdx]>arr[maxIdx]) {
      maxIdx = rChildIdx;
    }
    if (maxIdx !== i) {
      // 即 当前，某个子节点的值大于父节点，此时标记这个节点是父节点，更换现在父节点的值与实际父节点的值，
      [arr[maxIdx], arr[i]] = [arr[i], arr[maxIdx]];
      heapify(arr, maxIdx);
    }
  }

  // 构建大顶堆（升序）， 二叉树非叶节点比叶节点少一个 Math.floor(len/2-1)
  // 从第一个叶节点开始，保证后面的顺序。
  for(let i = Math.floor(len / 2); i >= 0; i--){
    heapify(arr,i);
  }
  // 调整大顶堆，并排序
  for (let i = len-1; i >= 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    len --; // 其中调整的是
    heapify(arr, 0);
  }

  return arr
}

function getRandomArr(sum,start, end) {
  let arr = [];
  for (let i =0;i<sum;i++) {
    arr.push(Math.random()*(end-start) + start);
  }
  return arr;
}
console.log(sort(getRandomArr(30,30,40)))

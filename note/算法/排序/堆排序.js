// 选择排序
function sort (arr) {
  let len = arr.length;
  // 数组前半段都是非叶节点
  // 构建大顶堆（升序）， 二叉树非叶节点比叶节点少一个，Math.floor(len/2)
  // 从第一个非叶节点开始，保证后面的顺序。
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

// 根据传入的i节点的位置调整一 i 为根节点的子树
function heapify (arr, i) {
  let lChildIdx = 2 * i + 1 // 左孩子
    ,rChildIdx = 2 * i + 2  // 右孩子
    ,maxIdx = i;          // 此时设父节点为最大

  // 先看左边子节点是否大于父节点，并记录“大的”位置
  if (lChildIdx<len && arr[lChildIdx]>arr[maxIdx]) {
    maxIdx = lChildIdx;
  }
  // 再看有节点是否大于  做节点和父节点中最大的，并记录“大的”位置
  if (rChildIdx<len && arr[rChildIdx]>arr[maxIdx]) {
    maxIdx = rChildIdx;
  }
  // 并记录“大的”位置 不是父节点
  if (maxIdx !== i) {
    // 即 当前，某个子节点的值大于父节点，此时标记这个节点是父节点，更换现在父节点的值与实际父节点的值，
    [arr[maxIdx], arr[i]] = [arr[i], arr[maxIdx]];
    // 于父节点交换值后 再规范子树
    heapify(arr, maxIdx);
  }
}


function getRandomArr(sum,start, end) {
  let arr = [];
  for (let i =0;i<sum;i++) {
    arr.push(Math.random()*(end-start) + start);
  }
  return arr;
}
console.log(sort(getRandomArr(30,30,40)))

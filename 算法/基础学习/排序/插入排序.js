// 从i=1 开始，默认i=0是有序，和前面序列比较找到合适位置插入
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
        console.log(arr)
    }
    return arr
}

console.log(insertSort([1,100, 2,4,10,-2,3,-10,20]))
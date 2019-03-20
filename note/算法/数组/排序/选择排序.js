// 从i（令他最小），开始寻找包含i的最小的数，i++(循环前面步骤)
function sort (arr) {
    let len = arr.length
      ,tempIdx;
    for (let i = 0; i < len-1; i++) {
        tempIdx = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[tempIdx] >= arr [j]) {
                tempIdx = j;
            }
        }
        [arr[i], arr[tempIdx]] = [arr[tempIdx], arr[i]];
    }
    return arr
}
console.log(sort([1,3,-10,20,100, 2,4,10,-2]))

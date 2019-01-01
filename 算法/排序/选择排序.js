// 从i（令他最小），开始寻找包含i的最小的数，i++(循环前面步骤)
function sort (arr) {
    let len = arr.length
        ,minIndex; //选择的最小值得index
    for (let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }

    return arr;
}

console.log(sort([1,3,-10,20,100, 2,4,10,-2]))
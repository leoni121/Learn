/**
 * @author NZQ
 * @data 2018/11/25
 * @Description :
 */


let threeSum = function(nums) {
    let posObj = {} // 正数的对象
        ,negObj = {} // 负数的对象
        ,haveZero = 0 // 判断是否有0，且记录0的个数
        ,result = []
    for (let i = 0, len = nums.length; i < len; i++) {
        if (nums[i] < 0) {
            posObj[nums[i]] ? posObj[nums[i]]++ : posObj[nums[i]] = 1;
        } else if (nums[i] > 0) {
            posObj[nums[i]] ? posObj[nums[i]]++ : posObj[nums[i]] = 1;
        } else {
            haveZero++;
        }
    }

    // 一正一负一零
    if (haveZero) {
        posObj.map(function (cur, key, arr) {
            if (negObj[-key]) {
                haveZero[haveZero.length].push([key, -key, 0]);
            }
        })
    }
    // 两正一负
    posObj.map(function (cur, key, arr) {
        if (negObj[-key]) {
            haveZero[haveZero.length].push([key, -key, 0]);
        }
    })
    // 两负一正
};
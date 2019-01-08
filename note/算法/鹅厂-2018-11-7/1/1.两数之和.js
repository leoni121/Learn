/*
*
* 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。

你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
*
* */
// 68ms
let twoSum = function (nums, target) {
    let end = nums.length;
    for (let i = 0; i < end; i++) {
        for (let j = i + 1; j < end; j++) {
            console.log(j)
            if (nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }
    throw new Error("没有！")
}

// 60ms
let twoSum1 = function (nums, target) {
    let end = nums.length;
    for (let i = 0; i < end; i++) {
        let diff = target - nums[i]
        if (nums.indexOf(diff)>=0) {
            return [i, nums.indexOf(diff)]
        }
    }
    throw new Error("没有！")
}

// https://blog.csdn.net/baidu_31333625/article/details/68062778
// js中的对象是基于哈希表结构
let twoSum2 = function (nums, target) {
    let end = nums.length;
    let obj = {};
    for (let i = 0; i < end; i++) {
        if (obj[nums[i]] === undefined) {
            obj[nums[i]] = i
        }
    }

    for (let i = 0; i < end; i++) {
        let diff = target - nums[i];
        if (obj[diff] !== undefined && obj[diff] !== i) {
            return [i, obj[diff]]
        }
    }
}

console.log(twoSum2([3, 2, 4], 6));
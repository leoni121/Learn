<<<<<<< HEAD
const express = require('express');
=======
/**
 * @Author nzq
 * @Date 2019-07-13
 * @Description: [最长递增子序列的三种算法](https://blog.csdn.net/love20165104027/article/details/79618367)
 * @Param:
 * @Return:
 */


// 连续-动态规划
function _getList(arr) {
  let len = arr.length;
  if (len <= 1) return arr;
  let res = 1,
    temp = 1;
  for (let i = 1; i < len; i++) {
    if (arr[i]>=arr[i-1]) {
      res++;
    }
    if (arr[i]<arr[i-1] || i+1===len) {
      temp > res ? res = temp : null;
      temp = 1;
    }
  }

  return res;
}

// 不连续-动态规划（）
// 思路： 分别计算以每一个值结尾的非递减序列的长度，
function getList(arr) {
  let len = arr.length;
  if (len <= 1) return arr;
  let res = [];
  // 默认初始化 以对应位置值，结尾的非递减序列长度为1
  for (let i = 0; i < len; i++) {
    res[i] = 1;
  }

  // 从第二个开始
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      // 后一个 > 前面某一个
      /*if (arr[i] > arr[j] && res[i] < res[j] + 1) {
        res[i] = res[j] + 1; // 计算以arr[i]结尾的序列的最长递增子序列长度
      }*/
      if (arr[i] > arr[])
    }
  }

  console.log(res);
  let max = 0;
  for (let i = 0; i < len; i++) {
    if (res[i] > max) max = res[i];
  }

  return max;
}

console.log(getList([10,11,12,1 ,2, 3]));
>>>>>>> 26c3a57a2524b9c87741aacdc7a86a8326ddf2e7

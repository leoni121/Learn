/**
 * @Author nzq
 * @Date 2019-08-13
 * @Description: 小希偶然得到了传说中的月光宝盒,然而打开月光宝盒需要一串密码。虽然小希并不知道密码具体是什么，但是月光宝盒的说明书上有着一个长度为 n (2 <= N <= 50000)的序列 a (-10^9 <= a[i] <= 10^9)的范围内。下面写着一段话：密码是这个序列的最长的严格上升子序列的长度(严格上升子序列是指，子序列的元素是严格递增的，例如: [5,1,6,2,4]的最长严格上升子序列为[1,2,4])，请你帮小希找到这个密码。
 *
 * [最长上升子序列（LIS）算法](https://blog.csdn.net/qq_40507857/article/details/81198662)
 * @Param:
 * @Return:
 */

// n*n
function _getMaxLenRiseSubStr(arr) {
  let res = [],
    n = arr.length,
    maxRes=0,
    max = 1;
  res[0] = 1;
  if(n >= 2 && n <= 50000) {
    for (let i = 0; i < n; i++) {
      if (arr[i] > arr[i - 1]) {
        res[i] = res[i - 1] + 1;
        if (res[i] > maxRes) maxRes = res[i];
      } else {
        max = 1;
        for (let j = 0; j < i-1; j++) {
          if (arr[i] > arr[j]) {
            max = Math.max(max, res[j] + 1);
          }
        }
        res[i] = max;
        if (max > maxRes) maxRes = max;
      }
    }
  }
  return maxRes;
}

// n * log2 N
function getMaxLenRiseSubStr(arr) {
  let len = arr.length,
    dp = [arr[0]],
    pos=0;

  for (let i = 1; i < len; i++) {
    if (arr[i] > dp[pos]) {
      dp[++pos] = arr[i];
    } else {
      dp[find(dp, 0, pos, arr[i])] = arr[i];
    }
  }
  console.log(dp);
  return dp.length;
}


function find(arr, start, end, num) {
  let mid = Math.floor((end+start)/2);
  if (start === end) return start;

  if (num > arr[mid]) {
    return find(arr, mid+1, end, num);
  } else {
    return find(arr, start, mid, num);
  }
}

console.log(getMaxLenRiseSubStr([1, 7, 4, 3, 5, 8, 4, 9, 4]))

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
      temp++;
    }
    if (arr[i]<arr[i-1] || i+1===len) {
      res = temp > res ? temp : res;
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
      // 找到 以arr[i]结尾的非递减序列的 前面部分（以合适的arr[j]结尾的为递减序列）
      if (arr[i] > arr[j] && res[i] < res[j] + 1) { // res[i] < res[j] + 1 保证上述条件的关键
        res[i] = res[j] + 1; // 计算以arr[i]结尾的序列的最长递增子序列长度
      }
      /* 错误-不能保证递增
        if (arr[i] > arr[j]) {
          res[i]++;
        }
      */
    }
  }
  
  // 获取最大
  let max = 0;
  for (let i = 0; i < len; i++) {
    if (res[i] > max) max = res[i];
  }

  return max;
}

console.log(getList([10,11,12,1 ,2, 3, 4,1,6,5]));

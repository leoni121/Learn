/**
 * @Author nzq
 * @Date 2019-08-05
 * @Description:作者：白日梦201712091734936
 链接：https://www.nowcoder.com/discuss/185129
 来源：牛客网

 求序列的一个子序列的最大和，比如[-1,2,3,4,-5], 那么子序列就是[2,3,4]，最大的和为9
 当时是傻逼了，记得以前做过这道题，然后以为是动态规划来解，就一直按照动态规划的思路去做，然后还没做出来，就给他写了一个暴力的做法(ノへ￣、)
 * @Param:
 * @Return:
 */

// 思路动态规划
function get (arr) {
  let len = arr.length;
  if (len === 0) return 0;

  let max = arr[0],
    temp = [arr[0]]; //　对应位置结尾的最大的和

  for (let i = 1; i < len; i++) {
    temp[i] = Math.max(temp[i-1] + arr[i], arr[i]);
    max = Math.max(max, temp[i]);
  }
  return max;
}

console.log(get([-1,2,3,-2,4,-5]))

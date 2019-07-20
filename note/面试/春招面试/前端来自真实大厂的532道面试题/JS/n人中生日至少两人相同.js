/**
 * @Author nzq
 * @Date 2019/3/21
 * @Description: 假设一年365天
 * @Param: n 人数
 * @Return:
 */

function getRate(n) {
  if (n > 365) {
    return 1
  }

  let rate = 1;
  for (let i = 0; i < n; i++) {
    rate *= (365 - i)/365
  }
  return 1 - rate
}
console.log(getRate(50));

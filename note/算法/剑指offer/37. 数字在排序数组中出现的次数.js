/**
 * @Author nzq
 * @Date 2019/5/29
 * @Description: 统计一个数字在排序数组中出现的次数。
 * @Param:
 * @Return:
 */

function GetNumberOfK(data, k)
{
  // write code here
  let times = 0;
  for (let i = 0, len = data.length; i < len; i++) {
    if (data[i] === k) times++;
  }
  return times;
}

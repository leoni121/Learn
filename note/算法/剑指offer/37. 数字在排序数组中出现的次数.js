/**
 * @Author nzq
 * @Date 2019/5/29
 * [数字在排序数组中出现的次数](https://www.nowcoder.com/practice/70610bf967994b22bb1c26f9ae901fa2?tpId=13&tqId=11190&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
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

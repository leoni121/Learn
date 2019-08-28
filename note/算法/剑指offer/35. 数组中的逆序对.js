/**
 * @Author nzq
 * @Date 2019/5/27
 * [数组中的逆序对](https://www.nowcoder.com/practice/96bd6684e04a44eb80e6a68efc0ec6c5?tpId=13&tqId=11188&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。并将P对1000000007取模的结果输出。 即输出P%1000000007
 * @Param:
 * @Return:
 */
// 思路一：穷举法
// 顺序扫描整个数组。每扫描到一个数组的时候，逐个比较该数字和它后面的数字的大小。如果后面的
// 字比它小，则这两个数字就组成了一个逆序对。假设数组中含有n个数字。由于每个数字都要和O(n)
// 个数字比较，因此这个算法的时间复杂度为O(n^2)。


// 思路二：归并
/** [参考](https://www.nowcoder.com/questionTerminal/96bd6684e04a44eb80e6a68efc0ec6c5)*/
// 归并排序的改进，把数据分成前后两个数组(递归分到每个数组仅有一个数据项)，
// 合并数组，合并时，出现前面的数组值array[i]大于后面数组值array[j]时；则前面
// 数组array[i]~array[mid]都是大于array[j]的，count += mid+1 - i
// 过程：先把数组分割成子数组，先统计出子数组内部的逆序对的数目，然后再统计出两个相邻子数组
// 间的逆序对的数目。在统计逆序对的过程中，还需要对数组进行排序。
function InversePairs(data)
{
  // write code here
  if (data.length < 2) {
    return 0;
  }
  let copy = data.slice(0); // 注意如果在 merge 里面 copy 的话会出问题（复杂度）
  return merge(data, copy, 0, data.length-1) % 1000000007;
}
function merge(data, copy, start, end) {
  if(end === start) {
    return 0;
  }
  // [1,2,3]
  let mid = (end+start)>>1,
    lCount = merge(data, copy, start, mid),
    rCount = merge(data, copy, mid+1, end),
    count = 0,
    lP = mid,
    rP = end,
    copyIdx = end;

  // 重点在于 两个有序数组怎么 获取 逆序对
  // 从后往前比较，找打大的就更新 copy
  while(lP>=start && rP>mid) {
    if (data[lP] > data[rP]) {
      count += (rP-mid);
      copy[copyIdx--] = data[lP--];
    } else {
      copy[copyIdx--] = data[rP--];
    }
  }
  while (lP >= start) {
    copy[copyIdx--] = data[lP--];
  }
  while (rP > mid) {
    copy[copyIdx--] = data[rP--];
  }

  for (let i = start; i <= end; i++) {
    data[i] = copy[i];
  }

  return lCount + rCount + count;
}

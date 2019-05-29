/**
 * @Author nzq
 * @Date 2019/5/27
 * @Description: 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。并将P对1000000007取模的结果输出。 即输出P%1000000007
 * @Param:
 * @Return:
 */
// 思路一：穷举
// O（n*n），在牛客网上面，不能通过。
// case通过率为50.00%
function _InversePairs(data)
{
  // write code here
  if (data.length < 2) {
    return 0;
  }
  let count = 0;
  for (let i = 0, len = data.length; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (data[i] > data[j]) {
        count++;
      }
    }
  }

  return count % 1000000007;
}

// 思路二：归并
// 注意如果在 merge 里面 copy 的话会出问题（复杂度）
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

console.log(InversePairs([364,637,341,406,747,995,234,971,571,219,993,407,416,366,315,301,601,650,418,355,460,505,360,965,516,648,727,667,465,849,455,181,486,149,588,233,144,174,557,67,746,550,474,162,268,142,463,221,882,576,604,739,288,569,256,936,275,401,497,82,935,983,583,523,697,478,147,795,380,973,958,115,773,870,259,655,446,863,735,784,3,671,433,630,425,930,64,266,235,187,284,665,874,80,45,848,38,811,267,575]))
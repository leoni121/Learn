/**
 * @Author nzq
 * @Date 2019/4/29
 * [二进制中1的个数](https://www.nowcoder.com/practice/8ee967e43c2c4ec193b040ea7fbb10b8?tpId=13&tqId=11164&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 在底层，负数就是用补码实现的
 *  输入一个整数，输出该数二进制表示中1的个数。其中负数用补码表示。
 * @Param:
 * @Return:
 */

/*function _NumberOf1(n)
{
  // write code here
  let count = 0;
  // 循环32 次
  while(n) {
    if (n&1) count++;
    n = n>>1;
  }
  return count;
}*/

function NumberOf1(n)
{
  // write code here
  let count = 0
    ,flag = 1;
  // 循环32 次
  while(flag) {
    if (n&flag) count++;
    flag = flag<<1;
  }
  return count;
}
console.log(NumberOf1(-3))

// 其他方法
// n&(n-1)
// 该位运算去除 n 的位级表示中最低的那一位。

// n       : 10110100
// n-1     : 10110011
// n&(n-1) : 10110000
// 时间复杂度：O(M)，其中 M 表示 1 的个数。

function NumberOf1(n) {
  let cnt = 0;
  while (n != 0) {
    cnt++;
    n &= (n - 1);
  }
  return cnt;
}

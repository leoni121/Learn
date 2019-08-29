/**
 * @Author nzq
 * @Date 2019/6/4
 * [求1+2+3+...+n](https://www.nowcoder.com/practice/7a0da8fc483247ff8800059e12d7caf1?tpId=13&tqId=11200&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 求1+2+3+...+n，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。
 * @Param:
 * @Return:
 */
function Sum_Solution(n)
{
  // write code here
  console.log(n)
  return n && Sum_Solution(n-1) + n;
}

console.log(Sum_Solution(3))

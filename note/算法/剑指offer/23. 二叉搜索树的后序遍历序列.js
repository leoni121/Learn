/**
 * @Author nzq
 * @Date 2019/5/15
 * @Description: 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。
 *     5
     3		7
   2  4  6   8

   2 4 3 6 8 7 5
 */

function VerifySquenceOfBST(sequence)
{
  // write code here
  let lt = [], rt = [], root, isOrder = false;
  if (!sequence.length) {
    return false;
  }
  root = sequence.pop();
  for (let i = 0, len = sequence.length; i < len; i++) {
    if (!isOrder && sequence[i] > root) {
      lt = sequence.slice(0, i);
      rt = sequence.slice(i);
      isOrder = true;
    }
    if (isOrder && sequence[i] < root) {
      return false;
    }
  }
  return (lt.length === 0 || VerifySquenceOfBST(lt)) && (rt.length ===0 || VerifySquenceOfBST(rt));
}

console.log(VerifySquenceOfBST([4,8,6,12,16,14,10]));

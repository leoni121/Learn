/**
 * @Author nzq
 * @Date 2019/5/15
 * [二叉搜索树的后序遍历序列](https://www.nowcoder.com/practice/a861533d45854474ac791d90e447bafd?tpId=13&tqId=11176&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。
 *     5
     3		7
   2  4  6   8

   2 4 3 6 8 7 5
 */

// 思路：BST的后序序列的合法序列是，对于一个序列S，最后一个元素是x （也就是根），如果去掉最后一个元素的序列为T，那么T满足：T可以分成两段，前一段（左子树）小于x，后一段（右子树）大于x，且这两段（子树）都是合法的后序序列。完美的递归定义 : ) 。
function VerifySquenceOfBST(sequence)
{
  // write code here
  let lt = [], rt = [], root, isOrder = false;
  if (!sequence.length) {
    return false;
  }
  root = sequence.pop();
  for (let i = 0, len = sequence.length; i < len; i++) {
    //
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

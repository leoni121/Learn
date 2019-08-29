/**
 * @Author nzq
 * @Date 2019/4/30
 * [二叉树的镜像](https://www.nowcoder.com/practice/564f4c26aa584921bc75623e48ca3011?tpId=13&tqId=11171&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 操作给定的二叉树，将其变换为源二叉树的镜像。
 *  思路：
 *    （1）两个中序遍历，第一次结束后反转，第二次赋值
 *    （2）一个按层遍历，在每一层中做数据的反转
 * @Param:
 * @Return:
 */

function Mirror(root)
{
  // write code here
  if (!root) return;
  let right = root.right;
  root.right = root.left;
  root.left = right;

  Mirror(root.left);
  Mirror(root.right);
}

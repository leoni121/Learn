/**
 * @Author nzq
 * @Date 19-6-17
 * @Description: 请实现一个函数，用来判断一颗二叉树是不是对称的。注意，如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的。
 * @Param:
 * @Return:
 */

function isSymmetrical(pRoot)
{
  // write code here
  if (!pRoot) return true;
  return pRoot.left.val === pRoot.right.val
    && isSymmetrical(pRoot.left)
    && isSymmetrical(pRoot.right);
}


/**
 * @Author nzq
 * @Date 2019/5/29
 * [二叉树的深度](https://www.nowcoder.com/practice/435fb86331474282a3499955f0a41e8b?tpId=13&tqId=11191&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 输入一棵二叉树，求该树的深度。从根结点到叶结点依次经过的结点（含根、叶结点）形成树的一条路径，最长路径的长度为树的深度。
 * @Param:
 * @Return:
 */

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function TreeDepth(pRoot)
{
  // write code here
  return (pRoot!==null
    ? (Math.max(TreeDepth(pRoot.left) + 1, TreeDepth(pRoot.right) + 1))
    : 0)
}

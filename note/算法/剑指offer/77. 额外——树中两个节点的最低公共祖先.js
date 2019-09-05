/**
 * @Author nzq
 * @Date 2019-07-24
 * @Description:
 * @Param:
 * @Return:
 */


// 情况一：二叉查找树
// 二叉查找树中，两个节点 p, q 的公共祖先 root 满足 root.val >= p.val && root.val <= q.val。

function _lowestCommonAncestor (root, p1, p2) {
  if (root == null)
    return null;

  // 在　root 的左边
  if (root.val > p.val && root.val > q.val)
    return lowestCommonAncestor(root.left, p, q);

  // 在　root 的右边
  if (root.val < p.val && root.val < q.val)
    return lowestCommonAncestor(root.right, p, q);

  // 此时: root.val >= p.val && root.val <= q.val
  return root;
}

// 情况二：普通二叉树，有指向父节点的指针
// 分别从输入的p节点和q节点指向root根节点，其实这就是两个单链表。问题转化为求两个单链表相交的第一个公共节点
// 36. 两个链表的第一个公共结点.js


// 情况三：普通二叉树
// 在左右子树中查找是否存在 p 或者 q，如果 p 和 q 分别在两个子树中，那么就说明根节点就是最低公共祖先。
// 找到公共点的时候回一直返回
function lowestCommonAncestor (root, p, q) {
  if (root == null || root === p || root === q) // (1).没有对应节点（null） (2).找到对应节点
    return root;

  let leftRes = lowestCommonAncestor(root.left, p, q);
  let rightRes = lowestCommonAncestor(root.right, p, q);

  if (leftRes === null) // 左子树没有找到
    return rightRes;
  if (rightRes === null)　//　右子树没有找到
    return leftRes;

  // 此时说明找到了 left/right
  return root;
}

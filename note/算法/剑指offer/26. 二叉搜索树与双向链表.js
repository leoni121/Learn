/**
 * @Author nzq
 * @Date 2019/5/21
 * @Description: 输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不能创建任何新的结点，只能调整树中结点指针的指向。
 * @Param:
 * @Return:
 */

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

// 中序遍历， 非递归
function _Convert(pRootOfTree)
{
  // write code here
  let stack = [],
    cur = pRootOfTree,
    pre = null,
    next = null,
    head = null;

  if (pRootOfTree) {
    while(true) {
      if (cur) {
        stack.push(cur);
        cur = cur.left;
      } else {
        if (!stack.length) {
          break;
        }
        next = stack.pop();
        if (next && pre) {
          next.left = pre;
          pre.right = next;
        } else {
          head = next;
        }
        if (next.right) {
          cur = next.right;
        }
        pre = next;
      }
    }
  }

  return head;
}

// 中序遍历 递归
let leftLast = null; // 左子树的最后一个
function Convert(pRootOfTree)
{
  // write code here
  if (pRootOfTree === null){
    return null;
  }
  if (pRootOfTree.left === null && pRootOfTree.right === null) {
    leftLast = pRootOfTree;
    return pRootOfTree;
  }
  let left = Convert(pRootOfTree.left);
  if (left !== null) {
    leftLast.right = pRootOfTree;
    pRootOfTree.left = leftLast;
  }
  // 此时左子树最后一个是 pRootOfTree
  leftLast = pRootOfTree;
  let right = Convert(pRootOfTree.right);

  if (right !== null) {
    right.left = pRootOfTree;
    pRootOfTree.right = right;
  }
  return left !== null ? left : pRootOfTree;
}

/**
 * @Author nzq
 * @Date 19-6-17
 * @Description: 给定一个二叉树和其中的一个结点，请找出中序遍历顺序的下一个结点并且返回。注意，树中的结点不仅包含左右子结点，同时包含指向父结点的指针。
 * @Param:
 * @Return:
 */

/*function TreeLinkNode(x){
    this.val = x;
    this.left = null;
    this.right = null;
    this.next = null;
}*/

function GetNext(pNode)
{
  // write code here
  if (!pNode) return null;

  let temp = null;

  // 有 右孩子
  if (pNode.right) {
    temp = pNode.right;

    while(temp.left) {
      temp = temp.left;
    }

    return temp
  }

  // 是父节点的 左节点
  while(pNode.next) {
    temp = pNode.next;
    // 判断是否是父节点的左孩子
    if (temp.left === pNode) {
      return temp;
    }

    pNode = pNode.next;
  }

  return null;
}

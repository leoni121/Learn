/**
 * @Author nzq
 * @Date 19-6-17
 * [二叉树的下一个结点](https://www.nowcoder.com/practice/9023a0c988684a53960365b889ceaf5e?tpId=13&tqId=11210&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
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

  // 当前节点有右节点，找到右孩子最左边的
  if (pNode.right) {
    temp = pNode.right;

    while(temp.left) {
      temp = temp.left;
    }

    return temp
  }

  // 找到左节点是（当前节点祖先节点）的节点
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

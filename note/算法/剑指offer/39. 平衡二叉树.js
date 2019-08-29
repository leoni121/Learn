/**
 * @Author nzq
 * @Date 2019/5/29
 * [平衡二叉树](https://www.nowcoder.com/practice/8b3b95850edb4115918ecebdf1b4d222?tpId=13&tqId=11192&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 输入一棵二叉树，判断该二叉树是否是平衡二叉树。
 * @Param:
 * @Return:
 */

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
// let cenTraArr = []; // 中序遍历结果
function IsBalanced_Solution(pRoot)
{
  // write code here

  return cenTravel(pRoot) !== -1;
}

function cenTravel (pRoot) {
  let deep = 0;
  if (!!pRoot) {
    let lDeep = cenTravel(pRoot.left);
    if (lDeep === -1) return -1;

    // cenTraArr.push(pRoot.val);

    let rDeep = cenTravel(pRoot.right);
    if (rDeep === -1) return -1;

    deep = Math.abs(lDeep - rDeep) < 2
      ?  1 + Math.max(lDeep, rDeep)
      : -1;
  }
  return deep;
}

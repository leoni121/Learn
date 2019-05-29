/**
 * @Author nzq
 * @Date 2019/5/29
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
/*  let mark = false;
  if (cenTravel(pRoot) !== -1) {
    mark = true;
    for (let i = 0, len = cenTraArr.length; i < len - 1; i++) {
      if (cenTraArr[i] > cenTraArr[i + 1]) {
        mark = false;
      }
    }
  }
  return  mark;*/

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

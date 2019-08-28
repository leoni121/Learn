/**
 * @Author nzq
 * [把二叉树打印成多行](https://www.nowcoder.com/practice/445c44d982d04483b04a54f298796288?tpId=13&tqId=11213&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Date 19-6-18
 * @Description: 从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行。
 * @Param:
 * @Return:
 */

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

//　非递归　
function _Print(pRoot)
{
  // write code here
  if(!pRoot) return [];
  let arr = [pRoot],
    tempArr = [],
    res = [],
    tempRes = [];

  while (arr.length) {
    tempArr = arr.slice(0);
    arr = [];
    for (let idx in tempArr) {
      tempRes.push(tempArr[idx].val);
      if (tempArr[idx].left) arr.push(tempArr[idx].left);
      if (tempArr[idx].right) arr.push(tempArr[idx].right);
    }
    res.push(tempRes);
    tempRes = [];
  }
  return res;
}

//　递归
function Print(pRoot)
{
  // write code here
  if(!pRoot) return [];
  let res = [];
  trval(pRoot, 0, res);
  return res;
}

function trval(tree, num, res) {
  if(!tree) return;
  if (!res[num]) {
    res[num] = [];
  }
  res[num].push(tree.val);
  trval(tree.left, num+1, res);
  trval(tree.right, num+1, res);
}

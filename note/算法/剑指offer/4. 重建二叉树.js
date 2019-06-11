/**
 * @Author nzq
 * @Date 2019/4/16
 * @Description: 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。
 * @Param:
 * @Return:
 */
const util = require('util');
/*class Node {
  constructor ({left=null, right=null, val=null}) {
    this.left = left;
    this.right = right;
    this.val = val;
  }
}*/
function TreeNode(x=0) {
  this.val = x;
  this.left = null;
  this.right = null;
}

function reConstructBinaryTree(pre, vin)
{
  // write code here
  let vinLTreeArr = [],
    vinRTreeArr = [],
    preLTreeArr = [],
    preRTreeArr = [],
    node = null,
    rootVal = (pre && pre[0]) && pre[0];

  if (rootVal) {
    node = new TreeNode();
    let temIdx = vin.indexOf(rootVal);
    vinLTreeArr = vin.slice(0, temIdx);
    vinRTreeArr = vin.slice(temIdx+1);
    preLTreeArr = pre[0] ? pre.slice(1, vinLTreeArr.length + 1) : [];
    preRTreeArr = pre[0] ? pre.slice(vinLTreeArr.length+1) : [];

    node.val = rootVal;
    node.left = reConstructBinaryTree(preLTreeArr, vinLTreeArr);
    node.right = reConstructBinaryTree(preRTreeArr, vinRTreeArr);
  }

  return node;
}

console.log(util.inspect(reConstructBinaryTree([1,2,4,7,3,5,6,8], [4,7,2,1,5,3,8,6]), true, 10))

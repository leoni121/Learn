/**
 * @Author nzq
 * @Date 2019/4/16
 * @Description:
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

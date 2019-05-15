/**
 * @Author nzq
 * @Date 2019/5/15
 * @Description: 输入一颗二叉树的跟节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。(注意: 在返回值的list中，数组长度大的数组靠前)
 * @Param:
 * @Return:
 */

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function FindPath(root, expectNumber)
{
  // write code here
  if (root.val > expectNumber) {
    return [];
  }
  let pathArr = []
    ,curNode = root
    ,nodeStack = []
    ,tempStack = []
    ,pathSum = 0;

  while(true) {
    if (curNode) {
      pathSum += curNode.val;
      console.log(pathSum)

      if (pathSum === expectNumber) {
        if (!nodeStack.length) {
          return pathArr
        }
        pathArr.push(tempStack.slice().push(curNode.val));
        curNode = nodeStack.pop().right;
        pathSum -= tempStack.pop();
      } else if(pathSum > expectNumber) {
        if (!nodeStack.length) {
          return pathArr
        }
        curNode = nodeStack.pop().right;
        pathSum -= tempStack.pop();
      }else {
        nodeStack.push(curNode);
        tempStack.push(curNode.val);
        curNode = curNode.left;
      }

    } else {
      if (!nodeStack.length){
        return pathArr;
      }
      curNode = nodeStack.pop().right;
    }
  }
  return pathArr;
}

console.log(FindPath({
  val: 1,
  left: {
    val: 10,
    left: {
      val: 112,
      left: null,
      right:null,
    },
    right: {
      val: 112,
      left: {
        val: 1121,
        left: null,
        right: null,
      },
      right:null,
    },
  },
  right: {
    val:11,
    left: {
      val: 111,
      left: null,
      right:null,
    },
    right: {
      val: 112,
      left: {
        val: 1111,
        left: null,
        right: null,
      },
      right:null,
    },
  }
}, 123))

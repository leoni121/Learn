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
// 非递归
function _FindPath(root, expectNumber) {
  // write code here
  if (root.val > expectNumber) {
    return [];
  }
  let pathArr = []
    ,curNode = root
    ,curNum = 0
    ,nodeStack = []
    ,numStack = []
    ,pathSum = 0;

  while(true) {
    if (curNode) {
      pathSum += curNum;

      if (pathSum === expectNumber) {
        pathArr.push(numStack.slice().push(curNum));
        curNode = nodeStack.pop().right;
        pathSum -= numStack.pop();
        if (!nodeStack.length) {
          return pathArr
        }
      } else if(pathSum > expectNumber) {
        if (!nodeStack.length) {
          return pathArr
        }
        curNode = nodeStack.pop().right;
        pathSum -= numStack.pop();
      }else {
        nodeStack.push(curNode);
        numStack.push(curNode.val);
        curNode = curNode.left;
      }
    } else {
      if (!nodeStack.length){
        return pathArr;
      }
      curNode = nodeStack[nodeStack.length - 1].right;
      nodeStack[nodeStack.length - 1].visity = true;
      if (!curNode) {
        curNode = nodeStack.pop();
        numStack.pop();

        while(curNode.visity) {
          curNode = nodeStack.pop();
          numStack.pop();
        }
        curNode = curNode.right;
      }
    }
  }
  return pathArr;
}
{
  // write code here
  if (root.val > expectNumber) {
    return [];
  }
  let pathArr = []
    ,curNode = root
    ,curNum = 0
    ,nodeStack = []
    ,numStack = []
    ,pathSum = 0;

  while(true) {
    if (curNode) {
      if (pathSum === expectNumber) {
        pathArr.push(numStack.slice().push(curNum));
        curNode = nodeStack.pop().right;
        pathSum -= numStack.pop();
        if (!nodeStack.length) {
          return pathArr
        }
      } else if(pathSum > expectNumber) {
        if (!nodeStack.length) {
          return pathArr
        }
        curNode = nodeStack.pop().right;
        pathSum -= numStack.pop();
      }else {
        nodeStack.push(curNode);
        numStack.push(curNode.val);
        curNode = curNode.left;
        curNum = curNode.val;
        pathSum += curNum;
      }
    } else {
      if (!nodeStack.length){
        return pathArr;
      }
      curNode = nodeStack.pop().right;
      pathSum -= numStack.pop();

      if (curNode) {
        curNum = curNode.val;
        pathSum += curNum;
      }
    }
  }
  return pathArr;
}

let pathSum = 0;
let resArr = [];
let numStack = [];
// 递归
function FindPath(root, expectNumber) {
  // write code here
  if (!root && root.val > expectNumber) {
    return resArr;
  }
  numStack.push(root.val);
  pathSum += root.val;
  if (expectNumber === pathSum) {
    resArr.push(numStack.slice());

  } else if (expectNumber > pathSum) {

  }
  root.left && FindPath(root.left, expectNumber - root.val);
  root.right && FindPath(root.right, expectNumber - root.val);

  return resArr;
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

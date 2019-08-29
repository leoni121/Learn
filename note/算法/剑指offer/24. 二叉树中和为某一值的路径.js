/**
 * @Author nzq
 * @Date 2019/5/15
 * [二叉树中和为某一值的路径](https://www.nowcoder.com/practice/b736e784e3e34731af99065031301bca?tpId=13&tqId=11177&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 输入一颗二叉树的跟节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。(注意: 在返回值的list中，数组长度大的数组靠前)
 * @Param:
 * @Return:
 */

// 递归
// 思路：
//    1. 递归先序遍历树， 把结点加入路径。
//    2. 若该结点是叶子结点则比较当前路径和是否等于期待和。
//    3. 弹出结点，每一轮递归返回到父结点时，当前路径也应该回退一个结点

function _FindPath(root, expectNumber)
{
  // write code here
  let pathAll = [];
  let path = [];
  if (root) {
    find(root, expectNumber, path, pathAll)
  }
  return pathAll
}

function find(root, expectNumber, path, pathAll) {
  path.push(root.val); // 加入
  expectNumber -= root.val;
  if (expectNumber === 0 && root.left === null && root.right === null) {
    pathAll.push(path.slice());
  }
  if (root.left) {
    find(root.left, expectNumber, path, pathAll);
  }
  if (root.right) {
    find(root.right, expectNumber, path, pathAll);
  }
  path.pop(); // 回退
}

//非递归版本
//思路：
//    1.按先序遍历把当前节点cur的左孩子依次入栈同时保存当前节点，每次更新当前路径的和sum；
//    2.判断当前节点是否是叶子节点以及sum是否等于expectNumber，如果是，把当前路径放入结果中。
//    3.遇到叶子节点cur更新为NULL，此时看栈顶元素，
//        如果栈顶元素的把栈顶元素保存在last变量中，同时弹出栈顶元素，当期路径中栈顶元素弹出，sum减掉栈顶元素，这一步骤不更改cur的值；
//        如果栈顶元素的右孩子存在且右孩子之前没有遍历过，当前节点cur更新为栈顶的右孩子，此时改变cur=NULL的情况。
function FindPath(root, expectNumber) {
  let pathAll = [], // 记录所有的路径
    path = [], // 当前的路径
    nodeStack = [], // 用于遍历
    curNode = root,
    lastNode = null, // 保存上一个节点
    sum = 0;

  if (root) {
    while(true) {
      if (curNode) {
        nodeStack.push(curNode);
        path.push(curNode.val);
        sum += curNode.val;

        // 叶子节点且相等
        if (!curNode.left && !curNode.right && sum === expectNumber) {
          pathAll.push(path.slice());
        }
        curNode = curNode.left;
      } else { // curNode === null
        if (!nodeStack.length) {
          break;
        }
        let tempNode = nodeStack[nodeStack.length - 1];
        if (tempNode.right && tempNode.right !== lastNode) {
          curNode = tempNode.right;
        } else {
          // 此时的 curNode 还是为 null, 以为着下一次还是会走当前 else
          lastNode = tempNode;

          nodeStack.pop();
          path.pop();
          sum -= tempNode.val;
        }
      }
    }
  }

  return pathAll;
}

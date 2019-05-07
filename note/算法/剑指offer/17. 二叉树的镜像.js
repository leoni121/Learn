/**
 * @Author nzq
 * @Date 2019/4/30
 * @Description: 操作给定的二叉树，将其变换为源二叉树的镜像。
 *  思路：
 *    （1）两个中序遍历，第一次结束后反转，第二次赋值
 *    （2）一个按层遍历，在每一层中做数据的反转
 * @Param:
 * @Return:
 */

/*let tempArr = [];
function Mirror(root) {
  // write code here
  preTransGet(root);
  preTransSet(root);
  return root;
}

function preTransGet (root) {
  if (!root) {
    return;
  }
  preTransGet(root.left);
  tempArr.push(root.val);
  preTransGet(root.right);
}

function preTransSet (root) {
  if (!root) {
    return;
  }
  preTransSet(root.left);
  root.val = tempArr.pop();
  preTransSet(root.right);
}

console.log(Mirror(
  {
    val: 8,
    left: {
      val: 6,
      left: {
        val:5,
        left: null,
        right: null,
      },
      right: {
        val: 7,
        left: null,
        right: null
      },
    },
    right: {
      val: 10,
      left: {
        val: 9,
        left: null,
        right: null,
      },
      right: {
        val: 11,
        left: null,
        right: null,
      },
    }
  }
))*/


/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Mirror(root)
{
  // write code here
  if (!root) return;
  let right = root.right;
  root.right = root.left;
  root.left = right;

  Mirror(root.left);
  Mirror(root.right);
}

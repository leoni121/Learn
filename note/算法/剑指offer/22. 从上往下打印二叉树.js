/**
 * @Author nzq
 * @Date 2019/5/15
 * [从上往下打印二叉树](https://www.nowcoder.com/practice/7fe2212963db4790b57431d9ed259701?tpId=13&tqId=11175&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 从上往下打印出二叉树的每个节点，同层节点从左至右打印。
 * @Param:
 * @Return:
 */

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function PrintFromTopToBottom(root)
{
  // write code here
  let stack = []
    ,curNode = null
    ,relArr = [];

  if (root) {
    stack.push(root);

    while(stack.length) {
      curNode = stack.shift();
      relArr.push(curNode.val);
      if (curNode.left) {
        stack.push(curNode.left);
      }
      if (curNode.right) {
        stack.push(curNode.right);
      }
    }
  }
  return relArr;
}

console.log(PrintFromTopToBottom(
  {
    val: '1',
    left: {
      val: '11',
      left: {
        val: '111',
        left: null,
        right:null,
      },
      right: {
        val: '112',
        left: {
          val: '1121',
          left: null,
          right: null,
        },
        right:null,
      },
    },
    right: {
      val:'12',
      left: {
        val: '121',
        left: null,
        right:null,
      },
      right: {
        val: '122',
        left: {
          val: '1221',
          left: null,
          right: null,
        },
        right:null,
      },
    }
  }
))

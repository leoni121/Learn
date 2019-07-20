/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
/*function createTree(arr) {
  if (!arr.length) {
    return null;
  }
  let curVal = arr.shift();
  if (curVal === '#') {
    return null;
  }
  return {
    val: curVal,
    left: createTree(arr),
    right: createTree(arr),
  }
}*/


/**
 * @Author nzq
 * @Date 2019/4/30
 * @Description: 输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）
 * @Param:
 * @Return:
 */

// 自己的思路
// 存在问题 子结构  和 子树是有区别的
// 该方程式只能判断 子树
function _HasSubtree(pRoot1, pRoot2) {
  // write code here
  if (!pRoot1 || !pRoot2) {
    return false;
  }

  return pRoot1.val === pRoot2.val && JSON.stringify(pRoot1).indexOf(JSON.stringify(pRoot2)) > -1
    || HasSubtree(pRoot1.left, pRoot2)
    || HasSubtree(pRoot1.right, pRoot2);

}

// 其他
// pRoot2 是不是 pRoot1 的子树
function HasSubtree(pRoot1, pRoot2) {
  // write code here
  if (!pRoot1 || !pRoot2) {
    return false;
  }
  return isSubTree(pRoot1, pRoot2)
    || HasSubtree(pRoot1.left, pRoot2)
    || HasSubtree(pRoot1.right, pRoot2)

}
function isSubTree(pRoot1, pRoot2) {
  // 注意这里的顺序 应该先判断pRoot2，
  // 不然当pRoot1 和 pRoot2 都是 null 的时候就返回的是 false, 但是应该返回的是 true
  if (!pRoot2) {
    return true;
  }
  if (!pRoot1) {
    return false;
  }
  return pRoot1.val === pRoot2.val
    && isSubTree(pRoot1.left, pRoot2.left)
    && isSubTree(pRoot1.right, pRoot2.right)
}

console.log(HasSubtree(
  {
    val: 'nzq',
    left: {
      val: 'wx',
      left: null,
      right: null,
    },
    right: {
      val: 'wx1',
      left: null,
      right: null,
    }
  },
  {
    val: 'nzq',
    left: {
      val: 'wx',
      left: null,
      right: null,
    },
    right: {
      val: 'wx1',
      left: null,
      right: null,
    }
  },
))

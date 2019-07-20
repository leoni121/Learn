/*
 *               A
 *         B           C
 *      D     E     F   G
 *    H           i       j
 *      K
 */
let tree = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D",
      left: {
        val: "H",
        left: null,
        right: {
          val: "K",
          left: null,
          right: null
        }
      },
      right: null
    },
    right: {
      val: "E",
      left: null,
      right: null
    }
  },
  right: {
    val: "C",
    left: {
      val: "F",
      left: {
        val: "I",
        left: null,
        right: null
      },
      right: null
    },
    right: {
      val: "G",
      left: null,
      right: {
        val: "J",
        left: null,
        right: null
      }
    }
  }
}

//　递归
function _traverse(tree) {
  if (!!tree) {
    _traverse(tree.left);
    _traverse(tree.right);
    console.log(tree.val);
  }
}

//　循环遍历
function traverse(tree) {

  let stack = [],
    pre = null, //　记录已经访问过的结点
    p = tree;

  while (true) {
    if (p) {
      stack.push(p);
      p = p.left;
    } else {
      //　个人认为只能防止为空一种情况
      if (!stack.length) return;
      p = stack[stack.length - 1];
      //　这里循环
      //　没有右结点，或者右结点已经访问过，处理当前结点
      /*            结点（１）
       *   结点（２）             结点（３）
       *        结点（４）
       */
      //　４　＝》　２　＝》　３　＝》　１
      while (!p.right || pre === p.right) {
        p = stack.pop();
        pre = p;
        console.log(p.val);
        if (!stack.length) return;
        p = stack[stack.length - 1];
      }
      //　此时　p.right && pre !== p.right
      p = p.right;
    }
  }
}

//　验证
_traverse(tree);
traverse(tree);
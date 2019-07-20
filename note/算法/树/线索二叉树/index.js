/**
 * @Author nzq
 * @Date 2019/3/22
 * @Description: 参考 https://www.jianshu.com/p/3965a6e424f5
 * @Param:  lTag ltag为0时，指向左孩子，为1时指向前驱
 * @Param:  rTag  rtag为0时，指向右孩子，为1时指向后继
 * @Return:
 */


const THREAD = 1;
const LINK = 0;
// 单个节点对象
class Node {
  constructor(data, lChild = null, rChild = null, lTag = LINK, rTag = LINK) {
    this.data = data;
    this.lChild = lChild;
    this.rChild = rChild;
    this.lTag = lTag;
    this.rTag = rTag;
  }
}

// 创建带线索二叉搜索树
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // 插入成功返回树
  insert(data) {
    let cNode = new Node(data);
    // 空树
    if (!this.root) {
      this.root = cNode;
      return;
    }
    // 非空树
    let currentNode = this.root;
    // 遍历
    while (1) {
      // 左子树
      if (data < currentNode.data) {
        if (currentNode.lChild === null) {
          currentNode.lChild = cNode;
          break
        }
        // 右子树
        else if (data > currentNode.data) {
          if (currentNode.rChild === null) {
            currentNode.rChild = cNode;
            break;
          }
        }
        // 相等
        else {
          break;
        }
      }
    }

    // 传入数组，创建树
    create(arr) {
      if (!arr.length) {
        this.root = null;
      } else {
        let length = arr.length;
        for (let i = 0; i < length; i++) {
          this.insert(arr[i]);
        }
      }
    }

    // 中序遍历建立线索二叉树
    cenThreading() {
      let pre = null;
      let (function _cenThreading(tree) {
        if (tree) {
          _cenThreading(tree.lChild);
          if (!tree.lChild) { // 当前结点的左孩子为空，左孩子指向
            tree.lTag = THREAD;
            tree.lChild = pre;
          }
          // pre 是先前的，此时tree是pre的后继
          if (pre && !pre.rChild) { // 前驱结点的右孩子为空时，指向当前节点（相对于pre是，指向后继节点）
            pre.rTag = THREAD;
            pre.rChild = tree;
          }
          pre = tree;
          _cenThreading(tree.rChild); //右子树线索化
        }
      })(this.root);
    }

    // 这个没有添加头结点
    //T指向头结点，头结点的lchild链域指针指向二叉树的根结点
    //中序遍历打印二叉线索树T（非递归算法）
    // 一直访问右节点7
    inOrderTraversePrint(tree) {
      let p = tree.lChild; //p指向根结点

      while (p !== tree) { //空树或遍历结束时，p == T
        while (p.lTag === LINK) {
          p = p.lChild;
        }
        //此时p指向中序遍历序列的第一个结点（最左下的结点）
        console.log(p.data); //打印（访问）其左子树为空的结点

        while (p.rTag === THREAD && p.rChild !== tree) {
          p = p.rChild;
          console.log(p.data) //访问后继结点
        }
        //当p所指结点的rchild指向的是孩子结点而不是线索时，p的后继应该是其右子树的最左下的结点，即遍历其右子树时访问的第一个节点
        p = p.rChild;
      }
    }

  }
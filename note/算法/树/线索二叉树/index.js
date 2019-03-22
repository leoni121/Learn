/**
 * @Author nzq
 * @Date 2019/3/22
 * @Description: 参考 https://www.jianshu.com/p/3965a6e424f5
 * @Param:  lTag ltag为0时，指向左孩子，为1时指向前驱
 * @Param:  rTag  rtag为0时，指向右孩子，为1时指向后继
 * @Return:
 */
  // 单个节点对象
class Node {
  constructor (data, lChild = null, rChild = null, lTag = 0, rTag = 0) {
    this.data = data;
    this.lChild = lChild;
    this.rChild = rChild;
    this.lTag = lTag;
    this.rTag = rTag;
  }
}

// 创建带线索二叉搜索树
class BinarySearchTree {
  constructor () {
    this.root = null;
  }

  // 插入成功返回树
  insert (data) {
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
        currentNode = currentNode.lChild;
      }
      // 右子树
      else if (data > currentNode.data) {
        if (currentNode.rChild === null) {
          currentNode.rChild = cNode;
          break;
        }
        currentNode = currentNode.rChild;
      }
      // 相等
      else {
        break;
      }
    }
  }

  // 传入数组，创建树
  create (arr) {
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
    const THREAD = 1;
    let pre = null;

    (function _cenThreading(tree) {
      if (tree) {
        _cenThreading(tree.lChild);
        if(!tree.lChild){ // 当前结点的左孩子为空，左孩子指向
          tree.lTag = THREAD;
          tree.lChild = pre;
        }
        // pre 是先前的，此时tree是pre的后继
        if(pre && !pre.rchild){ // 前驱结点的右孩子为空时，指向当前节点（相对于pre是，指向后继节点）
          pre.rTag = THREAD;
          pre.rchild = tree;
        }
        pre = tree;
        _cenThreading(tree.rChild);//右子树线索化
      }
    })(this.root)
  }

}


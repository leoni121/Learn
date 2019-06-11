/**
 * @Author nzq
 * @Date 2019/3/20
 * @Description:
 * @Param:
 * @Return:
 */

class Node {
  constructor ({
    data = "",
    bf = 0,  // 平衡因子,左子树深度减去右子树深度的值
    lChild = null,
    rChild = null,
               }) {

    this.data = data;
    this.bf = bf;
    this.lChild = lChild;
    this.rChild = rChild;
  }
}

class AVLTree {
  constructor (arr) {
    this.tree = null;
    this.taller = true; // 判断是否长高
    if (Object.prototype.toString.call(arr) === "[object Array]") {
      this.create(arr);
    }
  }

  // 左旋,RR
  L_Rotate(T){
    let R = T.rChild;
    T.rChild = R.lChild;
    R.lChild = T;
    return R;
  }

  // 右旋,LL
  R_Rotate(T){
    let L = T.lChild;
    T.lChild = L.rChild;
    L.rChild = T;
    return L;
  }

  // 对根结点为T的不平衡子树进行旋转调整操作，并写入BF大小
  leftBalance(T){
    let lc = T.lChild; //根结点的左孩子
    if (lc.bf === 1) { // 新节点插入在根结点左孩子 的左子树。为LL型
      lc.bf = 0;
      T.bf = 0;
      return this.R_Rotate(T);

    } else if (lc.bf === -1) { // 新节点插入在根结点左孩子 的右子树。为LR型
      let rd = lc.rChild; // 指向根结点左孩子的右子树根

      switch (rd.bf){ // 对应LR型的三种平衡因子变化情况
        case 1:
          lc.bf = 0;
          T.bf = -1;
          break;
        case -1:
          lc.bf = 1;
          T.bf = 0;
          break;
        case 0: // 此时的 rd 是刚刚插入的
          lc.bf = 0;
          T.bf = 0;
          break;
      }

      rd.bf = 0;
      T.lChild = this.L_Rotate(T.lChild);  //LR型为两次旋转
      return this.R_Rotate(T);
    }
  }

  // 对根结点为T的不平衡子树进行旋转调整操作，并写入BF大小
  rightBalance(T){ // 对根结点为T的不平衡子树进行旋转调整操作
    let rc = T.rChild; // 根结点的右孩子
    if (rc.bf === -1) {
      // 新节点插入在根结点左孩子的左子树。为RR型
      rc.bf = 0;
      T.bf = 0;
      return this.L_Rotate(T); // RR型为一次旋转

    } else if (rc.bf === 1) {
      // 新节点插入在根结点左孩子的右子树。为RL型
      let ld = rc.lChild; //指向根结点左孩子的右子树根

      switch (ld.bf){ // 对应RL型的三种平衡因子变化情况
        case 1:
          rc.bf = -1;
          T.bf = 0;
          break;
        case -1:
          rc.bf = 0;
          T.bf = 1;
          break;
        case 0:
          rc.bf = 0;
          T.bf = 0;
          break;
      }

      ld.bf = 0;
      T.rChild = this.L_Rotate(T.rChild); //RL型先右转右子树，在左转根节点
      return this.L_Rotate(T);
    }
  }

  // 插入节点
  insertAVL(T,data){ // 插入节点至平衡二叉树
    let tempNode = null;

    if (!T){ // 节点不存在，则在此位置新建节点
      T = new Node({data});
      this.taller = true;
    } else{
      if (data === T.data){ // 如果二叉树中已有与data相同的值，而不插入
        this.taller = false;
        return false; // 此时等于false 可用于下列判断是否插入
      }else if (data < T.data){ // 如果插入值小于当前节点值
        tempNode = this.insertAVL(T.lChild,data); //则在当前节点的左子树继续搜索
        if ( !tempNode ) return false;  //未插入
        T.lChild = tempNode;

        if (this.taller){
          switch (T.bf){ // 在当前节点的左子树成功插入节点时
            case 1: // 原本左子树比右子树高，插入节点后，需要做平衡处理
              T = this.leftBalance(T);
              this.taller = false;
              break;
            case 0: // 原本左子树和右子树一样高，插入节点后，树长高
              T.bf = 1;
              this.taller = true;
              break;
            case -1: // 原本左子树比右子树矮，插入节点后，现左右树等高
              T.bf = 0;
              this.taller = false;
              break;
          }
        }
      }else{ // 如果插入值大于当前节点值
        tempNode = this.insertAVL(T.rChild,data); // 则在当前节点的右子树继续搜索
        if ( !tempNode ) return false;  //未插入
        T.rChild = tempNode;

        if (this.taller){
          switch (T.bf){  // 在当前节点的右子树成功插入节点时
            case 1: // 原本左子树比右子树高，插入节点后，现左右树等高
              T.bf = 0;
              this.taller = false;
              break;
            case 0:  // 原本左子树和右子树一样高，插入节点后，树长高
              T.bf = -1;
              this.taller = true;
              break;
            case -1: // 原本左子树比右子树矮，插入节点后，需要做平衡处理
              T = this.rightBalance(T);
              this.taller = false;
              break;
          }
        }
      }
    }
    return T;
  }

  // 中序遍历
  cenTraverse(tree) {
    let arr = [];
    (function _traverse (tree) {
      if (tree) {
        _traverse(tree.lChild);
        arr.push(tree.data);
        _traverse(tree.rChild);
      }
    })(tree ? tree : this.tree)

    return arr;
  }

  // 创建二叉平衡树
  create(arr) {
    arr.forEach(cur => {
      this.tree = this.insertAVL(this.tree, cur)
    })
  }
}

let tree = new AVLTree([1,2,3,4,5,6,7,8,9,10]);

console.log(tree.tree);
console.log(tree.cenTraverse());


class Tree {
  constructor() {
    this.root = null;
  }

  // 递归
  create(arr) {
    if (!(arr.length && arr[0] !== 0)) {
      return null;
    }
    let temp = "";

    this.root = _create(arr);

    function _create(arr) {
      let tree = null;
      if (arr.length) {
        tree.data = arr.shift();
        tree.left = _create(arr);
        tree.right = _create(arr);
      }
      return tree;
    }
  }

  // 非递归
  create1(arr) {
    if (!arr.length || !arr[0]) {
      return;
    }
    let tempValue;
    let tempNode;
    let tempStack = [];
    this.root = {
      data: arr.shift(),
      left: {},
      right: {},
    };
    tempStack.push(this.root.right);
    tempStack.push(this.root.left);

    while (arr.length) {
      tempValue = arr.shift();
      if (tempValue) {
        tempNode = tempStack.pop();
        tempNode.data = tempValue;
        tempNode.left = {};
        tempNode.right = {};
        tempStack.push(tempNode.right);
        tempStack.push(tempNode.left);
      } else {
        tempStack.pop();
      }
    }
  }

  let tree1 = new Tree();
  tree1.create(['A', 'B', 'D', 'H', 0, 'K', 0, 0, 0, 'E', 0, 0, 'C', 'F', 'I', 0, 0, 0, 'G', 0, 'J', 0, 0])
  console.log(JSON.stringify(tree1.root, null, 4))
class Tree
{
  constructor () {
    this.root = null;
  }

  create(arr) {
    if (!(arr.length && arr[0] !== 0)) {
      return null;
    }
    let temp = "";
    this.root = {};

    function _create(arr, tree) {
      temp = arr.shift();
      if (arr.length && temp !== 0) {
        tree.data = temp;
        tree.left = {};
        tree.right = {};
        _create(arr, tree.left);
        _create(arr, tree.right);
      }
    }
    _create(arr, this.root);
  }
}

let tree1 = new Tree();
tree1.create(['A', 'B', 'D', 'H', 0, 'K', 0, 0, 0, 'E', 0, 0, 'C', 'F', 'I', 0, 0, 0, 'G', 0, 'J', 0, 0])
console.log(JSON.stringify(tree1.root, null, 4))

function getSomeNode (tree) {
  let nodeBuffer = [];

  function _get () {
    let childNum = 0;

    for (let key in tree) {
      childNum ++;
      if (Object.prototype.toString.call(tree[key]) === "[object Object]") {
        _get(tree[key])
      }
    }

    if (childNum >= 2) {
      nodeBuffer.push(tree)
    }
  }

  _get();

  return nodeBuffer;
}

console.log(getSomeNode({ node: 'root', next: [ { node: 'second_root' }, { node: 'second_child', next: [{ node: 'second_child_1', next: { node: 'second_child_1_1' } }, { node: 'second_child_2' }] }, { node: 'third_root', next: { node: 'third_child' , next: [{ node: 'third_child_1', next: { node: 'third_child_1_1' } }, { node: 'third_child_2' }] } } ] }))

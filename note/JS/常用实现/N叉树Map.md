```js
/**
- @Author nzq
- @Date 19-6-12
- @Description:
- @Param:
- @Return:
  */

function isObject(arg) {
  return Object.prototype.toString.call(arg) === '[object Object]';
}
function map (tree, cb) {
  let newTree = {};
  for(let key in tree) {
    if (isObject(tree[key])) { // 是对象
      newTree[key] = map(tree[key], cb);
    } else {
      newTree[key] = cb(tree[key], key);
    }
  }
  return newTree;
}

let Tree = {
  name: 'nzq',
  try: {
    name: 'wx',
    age: '12',
  },
}

console.log(JSON.stringify(map(Tree, (val, key) => {
  return val+'change'+key;
}), null, 4));
```



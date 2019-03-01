let elemArr = [];

function traverse(root) {
  if(root.offsetWidth > 50 && root.offsetHeight > 50) {
    elemArr.push(root);
    if(root.children) {
      for(let i = 0, len = root.children.length; i < len ;i++) {
        traverse(root.children[i]);
      }
    }else {
      return 0;
    }
  } else {
    return 0;
  }
}

traverse(root)

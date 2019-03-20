const A_ASCII = 97;

// 字典树节点
class TrieNode {
  constructor ({
                 num = 1, // 有多少单词通过这个节点,即由根至该节点组成的字符串模式出现的次数
                 son = {}, // 所有的儿子节点
                 isEnd = false, // 是不是最后一个节点
                 val = "", // 节点的值
               }) {
    this.num = num;
    this.son = son;
    this.isEnd = isEnd;
    this.val = val;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode({});
  }

  // 建立字典树
  insert(str) { // 在字典树中插入一个单词
    if (!str) {
      return;
    }

    let node = this.root;
    for (let i = 0, len = str.length; i < len; i++)
    {
      let pos = str[i];
      if (!node.son[pos]) { // 如果当前节点的儿子节点中没有该字符，则构建一个TrieNode并复值该字符
        node.son[pos] = new TrieNode({});
        node.son[pos].val = str[i];
      } else { // 如果已经存在，则将由根至该儿子节点组成的字符串模式出现的次数+1
        node.son[pos].num ++;
      }
      node = node.son[pos];
    }
    node.isEnd = true;
  }

  // 计算单词前缀的数量
  countPrefixOfStr(prefix) {
    if(!prefix) {
      return -1;
    }
    let node=this.root;
    for(let i=0,len=prefix.length; i<len; i++) {
      let pos = this.getAsciiCode(prefix[i]);
      if(!node.son[pos]) {
        return 0;
      } else {
        node=node.son[pos];
      }
    }
    return node.num;
  }

  // 打印指定前缀的单词
  printSpecialPrefixStr(prefix) {
    if (!prefix) {
      return null;
    }
    let node = this.root;
    for (let i = 0, len = prefix.length; i < len; i++) {
      let pos = this.getAsciiCode(str[i]);
      if (!node.son[pos]) {
        return null;
      } else {
        node = node.son[pos];
      }
    }
    this.traverseGetStr(node, prefix);
    return null;
  }

  // 遍历经过此节点的单词
  traverseGetStr(node, prefix) {
    if (!node.isEnd) {
      for (let child of node.son) {
        if (child != null) {
          this.printSpecialPrefixStr(child, prefix + child.val)
        }
      }
        return;
      }
      console.log(prefix);
    }

  // 在字典树中查找一个完全匹配的单词
  haveSpecialStr(str) {
    if (!str) {
      return false;
    }
    let node = this.root;
    for (let i = 0, len = str.length; i < len; i++) {
      let pos = this.getAsciiCode(str[i]);
      if (node.son[pos]) {
        node = node.son[pos];
      } else {
        return false
      }
    }

    // 走到这一步，表明可能完全匹配，可能部分匹配，如果最后一个字符节点为末端节点，则是完全匹配，否则是部分匹配
    return node.isEnd;
  }

  preTraverse(node) {
    if (node) {
      console.log(node.val + '-');
      for (let child of node.son) {
        this.preTraverse(child);
      }
    }
  }

  getRoot() {
    return this.root;
  }

  getAsciiCode(str) {
    return str.charCodeAt(0) - A_ASCII;
  }
}


let tree = new Trie();
let strs = ["banana","band","bee","absolute","acm"];
let prefix= ["ba","b","band","abc"];

for (let str of strs) {
  tree.insert(str);
}

console.log(tree.haveSpecialStr("abs"));
tree.preTraverse(tree.getRoot());

for (let pre of prefix) {
  let count = tree.countPrefixOfStr(pre);
  console.log("%s为前缀的数量是:%d", pre, count)
}
console.log(tree);

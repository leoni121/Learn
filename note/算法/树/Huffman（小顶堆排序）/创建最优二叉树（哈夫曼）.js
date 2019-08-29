class HuffmanTreeNode {
  constructor ({
                 weight = 0,
                 char = '',
                 left = null,
                 right = null,
               }) {
    this.left = left;
    this.right = right;
    this.weight = weight;
    this.char = char;
  }
}


/**
 * @author Nzq
 * @date 2019/3/10
 * @Description: 把一个数组抽象为小顶堆，用于huffman 构造过程中的排列
 * @Param:
 */
class heapMin {
  constructor (arr = []) {
    this.set = arr;
    if (arr.length > 1) {
      for (let i = Math.floor(this.set.length / 2); i >= 0; i--) {
        this.adjust(i)
      }
    }
  }

  adjust (index) {
    let len = this.set.length
      ,left = index * 2 + 1
      ,right = index * 2 + 2
      ,min = index
      ,selfSet = this.set;

    if (left < len && selfSet[min].weight > selfSet[left].weight) {
      min = left;
    }
    if (right < len && selfSet[min].weight > selfSet[right].weight) {
      min = right;
    }
    if (min !== index) {
      [selfSet[min], selfSet[index]] = [selfSet[min], selfSet[index]];
      if (min * 2 + 1 >= len) {
        this.adjust(min);
      }
    }
  }

  push (node) {
    this.set.push(node);
    // Math.floor(this.set.length / 2) 是新push的节点的父节点
    for (let i = Math.floor(this.set.length / 2); i >= 0; i--) {
      this.adjust(i)
    }
  }

  pop () {
    // 移出顶点
    let node = this.set.shift();
    this.adjust(0);
    return node;
  }

  size () {
    return this.set.length;
  }

  isEmpty () {
    return this.set.length === 0;
  }
}


class HuffmanCode {
  constructor () {
    this.codeTable = [];
    this.huffmanTree = null;
  }

  /**
   * @author Nzq
   * @date 2019/3/10
   * @Description: 返回值 返回一个字符串出现频次的最小堆,统计字符出现的频次，生成字符频次小顶堆
   * @Param: str 要进行编码的字符串
   */
  calcHeap (str) {
    let set = []

    for (let i = str.length - 1; i >= 0; i--) {
      if (set[str[i]]) {
        set[str[i]].weight++
      } else {
        // 所有叶节点都有相应对应的char
        set[str[i]] = new HuffmanTreeNode({
          weight: 1,
          char: str[i],
        })
      }
    }
    return new heapMin(Object.values(set));
  }

  createHuffmanTree (str) {
    let heap = this.calcHeap(str);
    console.log(heap);
    while (heap.size() > 1) {
      let min1 = heap.pop();
      let min2 = heap.pop();
      console.log(min1.weight, min2.weight);
      // 生成的非叶节点都是没有，char的
      let parent = new HuffmanTreeNode({
        weight: min1.weight + min2.weight,
        left: min1,
        right: min2,
      });

      heap.push(parent);
    }

    // 这里pop的是最后push进去的parent
    this.huffmanTree = heap.pop();
  }

  /**
   * @author Nzq
   * @date 2019/3/10
   * @Description: 递归哈夫曼树，生成对应字符串的编码表
   * @Param: HuffmanTreeNode：当前要递归的结点， 左0 右1
   * @Param: codeTable：编码表
   * @Param: code：编码字符串
   */
  traverseTree (HuffmanTreeNode = this.huffmanTree, codeTable = this.codeTable, code = '') {
    // huffman树一定是有两个子节点的
    if (HuffmanTreeNode.left !== null && HuffmanTreeNode.right != null) {
      this.traverseTree(HuffmanTreeNode.left, codeTable, code+'0')
      this.traverseTree(HuffmanTreeNode.right, codeTable, code+'1')
    }
    // 避免根节点，没有char的产生编码， 只有叶子节点上面才有char
    if (HuffmanTreeNode.char !== '') {
      codeTable[HuffmanTreeNode.char] = code
    }
  }

  /**
   * @author Nzq
   * @date 2019/3/10
   * @Description: 根据字出现的频率，为权重编码
   * @Param:
   */
  encode (str) {
    let res = [];
    this.createHuffmanTree(str); // 创建
    this.traverseTree() // code，编码字符串没有

    // 遍历把数组（str）中对应字符串（索引）的编码(在编码表中)加入res
    for (let i = str.length - 1; i >=0; i--) {
      res.push(this.codeTable[str[i]])
    }
    return res.join('_')
  }

  /**
   * @author Nzq
   * @date 2019/3/10
   * @Description: 解码
   * @Param:
   */
  decode (str) {
    if (this.huffmanTree === null) {
      console.error('Please create HuffmanTree!');
    }

    let node = this.huffmanTree
    let res = []

    for (let len = str.length, i=0; i < len; i++) {
      // 根据传入的编码方式来遍历
      if (str[i] === '0') {
        node = node.left
      } else {
        node = node.right
      }

      if (node.left === null && node.right === null) { // 此时标识一个字符编码完成
        res.push(node.char)
        node = this.huffmanTree // 遍历完一个字母
      }
    }

    return res.join('_')
  }
}

let huffmanCode = new HuffmanCode()

console.log(huffmanCode.encode('我是大白兔欢迎你我是我是力量哈哈'))
console.log(huffmanCode.decode('10101010101111001101111011011110111100000101001110011011110'))

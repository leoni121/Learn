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
      this.adjust(0);
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
      [selfSet[min], selfSet[index]] = [selfSet[min], selfSet[index]]
      this.adjust(min);
    }
  }

  push (node) {
    this.set.push(node);
    for (let i = Math.floor(this.set.length / 2); i >= 0; i--) {
      this.adjust(i)
    }
  }

  pop () {
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
   * @Description: 返回值 返回一个字符串出现频次的最小堆,统计字符出现的频次，生成字符频次最小堆
   * @Param: str 要进行编码的字符串
   */
  calcHeap (str) {
    let set = []

    for (let i = str.length - 1; i >= 0; i--) {
      if (set[str[i]]) {
        set[str[i]].weight++
      } else {
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

    while (heap.size() > 1) {
      let min1 = heap.pop();
      let min2 = heap.pop();
      let parent = new HuffmanTreeNode({
        weight: min1.weight + min2.weight,
        left: min1,
        right: min2,
      });

      heap.push(parent);
    }

    this.huffmanTree = heap.pop();
  }

  /**
   * @author Nzq
   * @date 2019/3/10
   * @Description: 递归哈夫曼树，生成编码表
   * @Param: HuffmanTreeNode：当前要递归的结点， 左0 右1
   * @Param: codeTable：编码表
   * @Param: code：编码字符串
   */
  traverseTree (HuffmanTreeNode, codeTable, code) {
    if (HuffmanTreeNode.left !== null && HuffmanTreeNode.right != null) {
      this.traverseTree(HuffmanTreeNode.left, codeTable, code+'0')
      this.traverseTree(HuffmanTreeNode.right, codeTable, code+'1')
    }
    // 避免根节点 没有char的产生编码
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
    this.createHuffmanTree(str);
    console.log(this.huffmanTree)
    this.traverseTree(this.huffmanTree, this.codeTable, '')
    console.log(this.codeTable);
    for (let i = str.length - 1; i >=0; i--) {
      // 遍历把数组中 对应字符串（索引）的编码加入res
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
      if (str[i] === '0') {
        node = node.left
      } else {
        node = node.right
      }

      if (node.left === null && node.right === null) {
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

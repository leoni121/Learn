/**
 * @Author nzq
 * @Date 2019/5/17
 * @Description: 输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），返回结果为复制后复杂链表的head。（注意，输出结果中请不要返回参数中的节点引用，否则判题程序会直接返回空）
 * @Param:
 * @Return:
 */

/*function RandomListNode(x){
    this.label = x;
    this.next = null;
    this.random = null;
}*/
// 利用数组
function _Clone(pHead) {
  // write code here
  let oldNodeArr = [],
    newNodeArr = [],
    tempPHead = pHead;
  if (tempPHead) {
    let idx = 0;

    // 遍历原始链表
    // 添加 _idx，赋值 oldNodeArr;
    while (tempPHead) {
      oldNodeArr[idx] = tempPHead;
      tempPHead._idx = idx++;
      tempPHead = tempPHead.next;
    }
    // 遍历 oldNodeArr 生成 newNodeArr
    for (let i = 0; i < idx; i++) {
      newNodeArr[i] = {
        label: oldNodeArr[i].label,
        next: null,
        random: null,
      }
    }

    // 遍历 newNodeArr，赋值元素的next 和 random
    for (let i = 0; i < idx; i++) {
      newNodeArr[i].next = newNodeArr[i + 1] || null;
      newNodeArr[i].random = newNodeArr[oldNodeArr[i].random._idx] || null;
    }

    // 删除原始链表上面的 _idx
    while (pHead) {
      delete pHead._idx;
      pHead = pHead.next;
    }

    // 返回
    return newNodeArr[0];
  }
}

// *解题思路：
// *1、遍历链表，复制每个结点，如复制结点A得到A1，将结点A1插到结点A后面；
// *2、重新遍历链表，复制老结点的随机指针给新结点，如A1.random = A.random.next;
// *3、拆分链表，将链表拆分为原链表和复制后的链表
function Clone(pHead) {
  // write code here
  let curNode = pHead,
    tempNode = null,
    newPHead = {next: null},
    curNewNode = newPHead;

  if (pHead) {
    // 1 添加节点
    while(curNode) {
      tempNode = {
        label: curNode.label,
        next: curNode.next,
        random: null,
      };
      curNode.next = tempNode;
      curNode = tempNode.next;
    }

    // 2 节点间关系
    curNode = pHead;
    while(curNode) {
      tempNode = curNode.next;
      // 可能没有 random
      if (curNode.random) {
        tempNode.random = curNode.random.next;
      }
      curNode = tempNode.next;
    }

    curNode = pHead;
    while(curNode) {
      tempNode = curNode.next;

      curNewNode.next = tempNode;
      curNode.next = tempNode.next;

      curNewNode = curNewNode.next;
      curNode = curNode.next;
    }
  }

  return newPHead.next;
}


// 检测
let a = {
  label : 'a',
  next : null,
  random : null,
}
let b = {
  label : 'b',
  next : null,
  random : null,
}
let c = {
  label : 'c',
  next : null,
  random : null,
}
let d = {
  label : 'd',
  next : null,
  random : null,
}

a.next = b;
b.next = c;
c.next = d;
a.random = c;
b.random = d;
c.random = a;
d.random = b

let _a = Clone(a)
console.log(_a);
//a
console.log(a.random === a.next.next);
console.log(a.next.random === a.next.next.next);
console.log(a.next.next.random === a);
console.log(a.next.next.next.random === a.next);

// _a
console.log(_a.random === _a.next.next);
console.log(_a.next.random === _a.next.next.next);
console.log(_a.next.next.random === _a);
console.log(_a.next.next.next.random === _a.next);

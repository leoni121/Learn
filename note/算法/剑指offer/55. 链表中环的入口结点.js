/**
 * @Author nzq
 * @Date 19-6-15
 * @Description:
 给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。
 * @Param:
 * @Return:
 */

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/

// 利用 map
function _EntryNodeOfLoop(pHead) {
  // write code here
  if (!pHead || !pHead.next) {
    return null;
  }

  let map = new Map(),
    node = null;

  while (pHead) {
    if (map.has(pHead)) {
      node = pHead;
      break;
    } else {
      map.set(pHead, 1);
      pHead = pHead.next;
    }
  }

  return null;
}


// 断链法
// 将链表 全部断开，找到最后一个next 为空的时候的 cur 就是入口
// 缺点：如果没有环的话，也会输出
function __EntryNodeOfLoop(pHead) {
  // write code here
  if (!pHead || !pHead.next) return null;

  let cur = pHead,
    next = pHead.next;

  while (next) {
    cur.next = null;
    cur = next;
    next = next.next;
  }

  return cur;
}

// slow、fast 指针
// x: 环前面的路程
// a：为环入口到相遇点的路程
// c：为环的长度
// Sslow = x + m*c + a
// Sfast = x + n*c + a
// 2 * Sslow === Sfast;
// x = (n - 2 *m -1 )*c + c - a
// 环前面的路程 = 整数个环的长度（为可能为0） + 相遇点到入口点的路程
function EntryNodeOfLoop(pHead) {
  if (pHead == null || pHead.next == null || pHead.next.next == null) return null;
  let fast = pHead,
    slow = pHead;

  while (slow && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (fast === slow) break;
  }

  //循环出来的话就是有环，且此时fast==slow.
  fast = pHead;
  while (fast != slow) {
    fast = fast.next;
    slow = slow.next;
  }
  return slow;
}
console.log(EntryNodeOfLoop({
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: null
    }
  }
}))

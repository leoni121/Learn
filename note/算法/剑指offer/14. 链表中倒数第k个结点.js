/**
 * @Author nzq
 * @Date 2019/4/29
 * [链表中倒数第k个结点](https://www.nowcoder.com/practice/529d3ae5a407492994ad2a246518148a?tpId=13&tqId=11167&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 输入一个链表，输出该链表中倒数第k个结点。
 * @Param:
 * @Return:
 */
function ListNode(x){
    this.val = x;
    this.next = null;
}

// 思路一：遍历一遍记长度，在遍历一遍
function _FindKthToTail(head, k)
{
  // write code here
  let len = 1
    ,tempHead = head
    ,idx = 0;

  while(tempHead = tempHead.next) {
    len++;
  }

  if (k > len) {
    tempHead = null;
  } else {
    tempHead = head;

    while(tempHead) {
      if (len - idx === k) {
        break;
      }
      idx ++;
      tempHead = tempHead.next
    }
  }
  return tempHead;
}

// 思路二：遍历一遍记录数组，取值
function FindKthToTail(head, k) {
  let nodeArr = [];
  while(head) {
    nodeArr.push(head);
    head = head.next;
  }

  return nodeArr[nodeArr.length - k]
}


// 思路三：回调，重尾到头记录个数 输出


// 性能最好
// 思路四：设链表的长度为 N。设置两个指针 P1 和 P2，先让 P1 移动 K 个节点，则还有 N - K 个节点可以移动。此时让 P1 和 P2 同时移动，可以知道当 P1 移动到链表结尾时，P2 移动到第 N - K 个节点处，该位置就是倒数第 K 个节点。


var a= new ListNode(1);
var b = new ListNode(2);
a.next = b;
var c = new ListNode(3);
b.next = c;

console.log(_FindKthToTail(a, 1))
console.log(_FindKthToTail(a, 2))
console.log(_FindKthToTail(a, 3))
console.log(_FindKthToTail(a, 4))
console.log(_FindKthToTail(a, 0))
console.log(FindKthToTail(a, 1))
console.log(FindKthToTail(a, 2))
console.log(FindKthToTail(a, 3))
console.log(FindKthToTail(a, 4))
console.log(FindKthToTail(a, 0))

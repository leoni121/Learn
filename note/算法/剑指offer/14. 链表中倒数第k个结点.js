/**
 * @Author nzq
 * @Date 2019/4/29
 * @Description: 输入一个链表，输出该链表中倒数第k个结点。
 * @Param:
 * @Return:
 */
function ListNode(x){
    this.val = x;
    this.next = null;
}
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
function FindKthToTail(head, k) {
  let nodeArr = [];
  while(head) {
    nodeArr.push(head);
    head = head.next;
  }

  return nodeArr[nodeArr.length - k]
}


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

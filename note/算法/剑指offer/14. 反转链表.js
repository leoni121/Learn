/**
 * @Author nzq
 * @Date 2019/4/29
 * @Description: 输入一个链表，反转链表后，输出新链表的表头。
 * @Param:
 * @Return:
 */

function ListNode(x){
    this.val = x;
    this.next = null;
}
/* 改变对象的 next 达到目的 */
function _ReverseList(pHead)
{
  // write code here
  let arr = [];
  while(pHead) {
    arr.push(pHead);
    pHead = pHead.next;
  }

  for (let i = arr.length-1; i >= 0; i--) {
    arr[i].next = arr[i - 1];
  }

  return arr[arr.length - 1];
}

/* 改变对象的val 达到目的 */
function ReverseList(pHead)
{
  var node=pHead, arr=[];
  while(node!=null){
    arr.push(node.val);
    node=node.next;
  }
  node = pHead;
  while(node!=null){
    node.val = arr.pop();
    node = node.next;
  }
  return pHead;
}

var a= new ListNode(1);
var b = new ListNode(2);
a.next = b;
var c = new ListNode(3);
b.next = c;
console.log(ReverseList(a))

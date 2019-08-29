/**
 * @Author nzq
 * @Date 2019/4/29
 * [反转链表](https://www.nowcoder.com/practice/75e878df47f24fdc9dc3e400ec6058ca?tpId=13&tqId=11168&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 输入一个链表，反转链表后，输出新链表的表头。
 * @Param:
 * @Return:
 */

// 1. 将单链表储存为数组，时间复杂度：O(N)，空间复杂度：O(N)
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
function __ReverseList(pHead)
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

// 2. 使用3个指针遍历单链表，逐个链接点进行反转
// pre pHead next
// 时间复杂度：O(N)
// 空间复杂度：O(1)
function ___ReverseList(pHead)
{
  let next = null,
    pre = null;
  while(pHead) {
    next = pHead.next;
    pHead.next = pre;
    pre = pHead;
    pHead = next;
  }
  return pre;
}


// 3. 从第2个节点到第N个节点，依次逐节点插入到第1个节点(head节点)之后，最后将第一个节点挪到新表的表尾。
// 时间复杂度：O(N)
// 空间复杂度：O(1)
function ____ReverseList(pHead)
{
  if (!pHead || !pHead.next) {
    return pHead;
  }

  let firstNode = pHead;
  pHead = pHead.next;

  while(pHead.next) {
    let temp = pHead.next;
    pHead.next = pHead.next.next;
    temp.next = firstNode.next;
    firstNode.next = temp;
  }
  let newHead = firstNode.next;
  pHead.next = firstNode;
  firstNode.next = null;

  return newHead;
}

// 递归
// 利用递归走到链表的末端，然后再（从右到左）更新每一个node的next 值 ，实现链表的反转。
// 而newhead 的值没有发生改变，为该链表的最后一个结点，所以，反转后，我们可以得到新链表的head。
// 注意关于链表问题的常见注意点的思考：
//
// 1、如果输入的头结点是 NULL，或者整个链表只有一个结点的时候
//
// 2、链表断裂的考虑
function ReverseList(pHead) {
  if (!pHead || !pHead.next) {
    return pHead;
  }

  // 当链表元素只有两个时 === pHead.next
  //这里的
  let newHead = ReverseList(pHead.next);

  pHead.next.next = pHead;
  pHead.next = null;

  return newHead
}
console.log(ReverseList({val: 'nzq', next: {val:'wx', next: {val: 'ex.nzq', next:null}}}))

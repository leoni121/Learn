/**
 * @Author nzq
 * @Date 2019/4/29
 * [合并两个排序的链表](https://www.nowcoder.com/practice/d8b6b4358f774294a89de2a6ac4d9337?tpId=13&tqId=11169&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。
 * @Param:
 * @Return:
 */

const util = require('util')
function ListNode(x){
    this.val = x;
    this.next = null;
}
/**
 * @Author nzq
 * @Date 2019/4/30
 * @Description: 最开始的解法
 */
/*
function Merge(pHead1, pHead2){
  if (!pHead1 && !pHead2) {
    return null;
  }
  // write code here
  let resHead = new ListNode()
    ,tempHead = resHead
    ,tempEnd = null;
  while(pHead1 && pHead2) {
    if (pHead1.val <= pHead2.val) {
      tempHead.val = pHead1.val;
      pHead1 = pHead1.next;
    } else {
      tempHead.val = pHead2.val;
      pHead2 = pHead2.next;
    }
    tempHead.next = new ListNode();
    tempHead = tempHead.next;
  }
  while(pHead1) {
    tempHead.val = pHead1.val;
    tempHead.next = new ListNode();
    tempEnd = tempHead;
    tempHead = tempHead.next;
    pHead1 = pHead1.next;
  }
  while(pHead2) {
    tempHead.val = pHead2.val;
    tempHead.next = new ListNode();
    tempEnd = tempHead;
    tempHead = tempHead.next;
    pHead2 = pHead2.next;
  }

  tempEnd.next = null;
  return resHead;
}
*/

/**
 * @Author nzq
 * @Date 2019/4/30
 * @Description: review
 */
/*function Merge(pHead1, pHead2){
  if (!pHead1) {
    return pHead2;
  }
  if (!pHead2) {
    return pHead1;
  }
  // write code here
  let resHead = new ListNode()
    ,tempHead = resHead;
  while(pHead1 && pHead2) {
    if (tempHead.val !== undefined) {
      tempHead = tempHead.next;
    }
    if (pHead1.val <= pHead2.val) {
      tempHead.val = pHead1.val;
      pHead1 = pHead1.next;
    } else {
      tempHead.val = pHead2.val;
      pHead2 = pHead2.next;
    }
    tempHead.next = new ListNode();
  }
  if(pHead1) {
    tempHead.next = pHead1;
  }
  if(pHead2) {
    tempHead.next = pHead2;
  }
  return resHead;
}*/

/**
 * @Author nzq
 * @Date 2019/4/30
 * @Description: 递归实现
 */
function Merge(pHead1, pHead2) {
  // write code here
  if (pHead1 == null) {
    return pHead2;
  } else if (pHead2 == null) {
    return pHead1;
  }
  let result = {};
  if (pHead1.val < pHead2.val) {
    result = pHead1;
    result.next = Merge(pHead1.next, pHead2);
  } else {
    result = pHead2;
    result.next = Merge(pHead1, pHead2.next);
  }
  return result;
}

console.log(
  util.inspect(
    Merge(
      {
        val: 1,
        next: {
          val: 10,
          next: {
            val: 17,
            next: null
          }
        }
      },
      {
        val: 2,
        next: {
          val: 4,
          next: {
            val: 6,
            next: null
          }
        }
      }
    ),
    true,
    100,
    'red'
  )
)

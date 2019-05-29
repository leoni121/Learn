/**
 * @Author nzq
 * @Date 2019/5/29
 * @Description: 输入两个链表，找出它们的第一个公共结点。
 * @Param:
 * @Return:
 */
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/

// 思路一：直接点的思路
// 数组 或 map
function _FindFirstCommonNode(pHead1, pHead2)
{
  // write code here
  let p1Arr = [];
  while(pHead1) {
    p1Arr.push(pHead1);
    pHead1 = pHead1.next;
  }
  while(pHead2) {
    if (p1Arr.indexOf(pHead2) !== -1) {
      return pHead2;
    }
  }
  return null;
}

// 思路二
// 得到两个链表的长度, 先遍历 长的链表长度差，之后同步遍历并比较
function __FindFirstCommonNode(pHead1, pHead2)
{
  // write code here
  let len1 = getListLength(pHead1),
    len2 = getListLength(pHead2);

  if (len1 > len2) {
    pHead1 = walkStep(pHead1, len1 - len2);
  } else {
    pHead2 = walkStep(pHead2, len2 - len1);
  }

  while (pHead1) {
    if (pHead1 === pHead2) {
      return pHead1;
    }
    pHead1 = pHead1.next;
    pHead2 = pHead2.next;
  }
  return null;
}

function getListLength(list) {
  let len = 0;
  while(list) {
    len++;
    list = list.next;
  }
  return len;
}

function walkStep(list, step) {
  while(step--) {
    list = list.next;
  }
  return list;
}
zq
// 思路三：
// pHead1 + pHead2 和 pHead2 + pHead1 一定有交集
// 1 - 2 - 3 - 4 - 5  $$$  9 - 8 - 7 - 6 - 3 - 4 - 5
// 9 - 8 - 7 - 6 - 3 - 4 - 5  $$$  1 - 2 - 3 - 4 - 5

// 3 - 4 - 5  $$$  9 - 8 - 7 - 6 - 3 - 4 - 5
// 9 - 8 - 7 - 6 - 3 - 4 - 5  $$$  3 - 4 - 5
function FindFirstCommonNode(pHead1, pHead2) {
  // write code here
  let p1 = pHead1,
    p2 = pHead2;

  while (p1 !== p2) {
    p1 = p1 === null ? pHead2 : p1.next;
    p2 = p2 === null ? pHead1 : p2.next;
  }

  return p1;
}


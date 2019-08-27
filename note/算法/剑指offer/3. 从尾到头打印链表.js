/**
 * @Author nzq
 * @Date 2019/4/16
 * [从尾到头打印链表](https://www.nowcoder.com/practice/d0267f7f55b3412ba93bd35cfa8e8035?tpId=13&tqId=11156&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 输入一个链表，按链表值从尾到头的顺序返回一个ArrayList。
 * @Param:
 * @Return:
 */
// 思路：
// 第一就是利用栈先入后出的特性完成，
// 第二就是存下来然后进行数组翻转。
// 第三是利用递归。
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function _printListFromTailToHead(head)
{
  // write code here
  let arr=[];
  let cur=head;
  while(cur){
    arr.push(cur.val);
    cur=cur.next;
  }
  return arr.reverse();
}

function printListFromTailToHead(head)
{
  if (head) {
    printListFromTailToHead(head.next)
    console.log(head.val)
  }
}

printListFromTailToHead({val: 123, next: {val: 423, next: null}})

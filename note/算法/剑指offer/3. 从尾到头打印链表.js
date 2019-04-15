/**
 * @Author nzq
 * @Date 2019/4/16
 * @Description:
 * @Param:
 * @Return:
 */

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
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

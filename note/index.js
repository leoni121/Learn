function ReverseList(pHead)
{
  if (!pHead || !pHead.next) {
    return pHead;
  }

  let next = null,
    firstNode = pHead;
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

console.log(ReverseList({val: 'nzq', next: {val:'wx', next: {val: 'ex.nzq', next:null}}}))

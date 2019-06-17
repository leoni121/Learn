/**
 * @Author nzq
 * @Date 19-6-15
 * @Description:
 在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5
 * @Param:
 * @Return:
 */

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
l
let obj = {
	nzq: 'name',
	wx: 'name'
}

for (let d in object) {
	if (object.hasOwnPropelet d)) {

}
}

function deleteDuplication(pHead) {
	// write code here
	if (!pHead || !pHead.next) return pHead;
	let cur = pHead,
		temp = null,
		val = 0;


	while (cur && cur.next) {
		val = cur.val;
		if (val === cur.next.val) {
			while (cur.next && val === cur.next.val) {
				cur = cur.next;
			}
			if (!temp) {
				pHead = cur.next;
			} else {
				temp.next = cur.next;
			}
		} else {
			temp = cur;
		}
		cur = cur.next;
	}
	return pHead;
}

let pHead = {
	val: 1,
	next: {
		val: 1,
		next: {
			val: 2,
			next: {
				val: 3,
				next: {
					val: 3,
					next: null
				}
			}
		}
	}
}
console.log(deleteDuplication(pHead))
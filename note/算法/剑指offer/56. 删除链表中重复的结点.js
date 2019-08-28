/**
 * @Author nzq
 * @Date 19-6-15
 * @Description:
 * [删除链表中重复的结点](https://www.nowcoder.com/practice/fc533c45b73a41b0b44ccba763f866ef?tpId=13&tqId=11209&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5
 * @Param:
 * @Return:
 */

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/

function _deleteDuplication(pHead) {
	// write code here
	if (!pHead || !pHead.next) return pHead;
	let cur = pHead,
		pre = null,
		val = 0;


	// cur.next 是为了记录不重复的节点，用于重复节点的删除
	while (cur && cur.next) {
		val = cur.val;
		if (val === cur.next.val) { // 当前节点值和下一个节点值相等
			while (cur.next && val === cur.next.val) { // 下一个存在且当前节点值和下一个节点值相等
				cur = cur.next;
			}
			// 此时 cur 是重复的节点中的最后一个
			// 根据pre 的不同删除所有重复的节点
			if (!pre) {
				pHead = cur.next;
			} else {
				pre.next = cur.next;
			}
		} else {
			pre = cur;
		}
		cur = cur.next;
	}
	return pHead;
}

// 递归
function deleteDuplication(pHead) {
	if (!pHead || !pHead.next) return pHead;

	let next = pHead.next;
	if (pHead.val === next.val) {
		while(!next && pHead.val === next.val) {
			next = next.next;
		}
		return deleteDuplication(next);
	} else {
		pHead.next = deleteDuplication(pHead.next);
		return pHead;
	}
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
console.log(JSON.stringify(deleteDuplication(pHead)))

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */

/**
 * [按之字形顺序打印二叉树](https://www.nowcoder.com/practice/91b69814117f4e8097390d107d2efbe0?tpId=13&tqId=11212&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * 请实现一个函数按照之字形打印二叉树，
 * 即第一行按照从左到右的顺序打印，
 * 第二层按照从右至左的顺序打印，
 * 第三行按照从左到右的顺序打印，
 * 其他行以此类推。
 * @method      Print
 * @date        2019-06-18
 * @author NZQ
 * @param       {TreeNode}   pRoot
 */

function Print(pRoot) {
	// write code here
	if (!pRoot) return [];
	let arr = [],
		tempArr = [],
		res = [],
		tempRes = [],
		order = true;

	arr.push(pRoot);

	while (arr.length) {
		tempArr = arr.slice(0);
		arr = [];
		//　遍历当前层
		for (let idx in tempArr) {
			tempRes.push(tempArr[idx].val);
			if (tempArr[idx].left) {
				arr.push(tempArr[idx].left);
			}
			if (tempArr[idx].right) {
				arr.push(tempArr[idx].right);
			}
		}
		order ? res.push(tempRes) : res.push(tempRes.reverse());
		order = !order;
		tempRes = [];
	}

	return res;
}

console.log(Print({
	val: 1,
	left: {
		val: 2,
		left: {
			val: 4,
			left: null,
			right: null,
		},
		right: {
			val: 5,
			left: null,
			right: null,
		}
	},
	right: {
		val: 3,
		left: {
			val: 6,
			left: null,
			right: null,
		},
		right: {
			val: 7,
			left: null,
			right: null,
		}
	}
}))

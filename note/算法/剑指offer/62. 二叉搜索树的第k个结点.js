/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
/**
 * 给定一棵二叉搜索树，请找出其中的第k小的结点。
 * 例如， （5，3，7，2，4，6，8）    中，按结点数值大小顺序第三小结点的值为4。
 * @method      KthNode
 * @date        2019-06-18
 * @author NZQ
 * @param       {TreeNode}   pRoot
 * @param       {Number}   k     
 * @constructor
 */
function KthNode(pRoot, k) {
	// write code here
	if (!pRoot || k === 0) return null;
	let stack = [],
		count = 0;
	while (true) {
		if (pRoot) {
			stack.push(pRoot);
			pRoot = pRoot.left;
		} else {
			if (!stack.length) {
				break;
			}
			pRoot = stack.pop();
			count++;
			if (count === k) {
				return pRoot;
			}
			pRoot = pRoot.right;
		}
	}
	return null;
}
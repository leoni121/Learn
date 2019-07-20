/**
 * 请实现一个函数，用来判断一颗二叉树是不是对称的。注意，如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的。
 * @method isSymmetrical
 * @date   2019-06-18
 * @author NZQ
 * @param  {tree}      pRoot 
 * @return {Boolean}   
 */

/* let arr = [];
//　思路一：中序遍历
function isSymmetrical(pRoot) {
	// write code here
	if (!pRoot) return true;
	centerTrval(pRoot);
	return String(arr.reverse()) === String(arr)
}

function centerTrval(tree) {
	if (!tree) return;
	centerTrval(tree.let);
	arr.push(tree.val);
	centerTrval(tree.right);
}
*/

/*
 * 思路：
 *  首先根节点以及其左右子树相同
 *  左子树的左子树和右子树的右子树相同
 *  左子树的右子树和右子树的左子树相同
 */
function isSymmetrical(pRoot) {
	// write code here
	if (!pRoot) return true;
	return judge(pRoot.left, pRoot.right);
}

function judge(node1, node2) {
	if (!node1) return node2 === null; //　都不存在
	if (!node2) return false; //　左子树不存在

	return node1.val === node2.val &&
		judge(node1.left, node2.right) &&
		judge(node1.right, node2.left);
}
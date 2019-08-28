/**
 * @Author nzq
 * @Date 19-6-18
 * [序列化二叉树](https://www.nowcoder.com/practice/cf7e25aa97c04cc1a68c8f040e71fb84?tpId=13&tqId=11214&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 请实现两个函数，分别用来序列化和反序列化二叉树
 * @Param:
 * @Return:
 */

/*
* /*
 1. 对于序列化：使用前序遍历，递归的将二叉树的值转化为字符，并且在每次二叉树的结点
不为空时，在转化val所得的字符之后添加一个' ， '作为分割。对于空节点则以 '#' 代替。
 2. 对于反序列化：按照前序顺序，递归的使用字符串中的字符创建一个二叉树(特别注意：
在递归时，递归函数的参数一定要是char ** ，这样才能保证每次递归后指向字符串的指针会
随着递归的进行而移动！！！)
*/

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
let arr = [];

function Serialize(pRoot) {
	// write code here
	if (!pRoot) {
		arr.push('#');
	} else {
		arr.push(pRoot.val);
		Serialize(pRoot.left);
		Serialize(pRoot.right);
	}
}

function Deserialize() {
	// write code here
	let tree = null;
	if (!arr.length) return tree;

	let val = arr.shift();
	if (val !== '#') {
		tree = {
			val: val,
			left: Deserialize(),
			right: Deserialize(),
		}
	}

	return tree;
}

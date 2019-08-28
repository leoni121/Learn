/**
 * [滑动窗口的最大值](https://www.nowcoder.com/practice/1624bc35a45c42c0bc17d17fa0cba788?tpId=13&tqId=11217&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * 给定一个数组和滑动窗口的大小，找出所有滑动窗口里数值的最大值。例如，如果输入数组{2,3,4,2,6,2,5,1}及滑动窗口的大小3，那么一共存在6个滑动窗口，他们的最大值分别为{4,4,6,6,6,5}； 针对数组{2,3,4,2,6,2,5,1}的滑动窗口有以下6个： {[2,3,4],2,6,2,5,1}， {2,[3,4,2],6,2,5,1}， {2,3,[4,2,6],2,5,1}， {2,3,4,[2,6,2],5,1}， {2,3,4,2,[6,2,5],1}， {2,3,4,2,6,[2,5,1]}。
 * @method maxInWindows
 * @date   2019-06-19
 * @author NZQ
 * @param  {array}     num  　数组
 * @param  {size}     size  窗口大小
 * @return {array}          数组
 */

// 思路一：length === size 的 array比较 num.length-1次
function maxInWindows(num, size) {
	// write code here
	let len = num.length,
		res = [];
	if (len < size || size <= 0) return res;
	for (let i = 0; i < len - size + 1; i++) {
		res.push(Math.max.apply(Array, num.slice(i, i + size)));
	}
	return res;
}

// 思路二：
// /**
// 用一个双端队列，队列第一个位置保存当前窗口的最大值，当窗口滑动一次
// 1.判断当前最大值是否过期
// 2.新增加的值从队尾开始比较，把所有比他小的值丢掉
// */
console.log(maxInWindows([2, 3, 4, 2, 6, 2, 5, 1], 3));

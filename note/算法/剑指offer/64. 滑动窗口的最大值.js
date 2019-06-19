/**
 * 给定一个数组和滑动窗口的大小，找出所有滑动窗口里数值的最大值。例如，如果输入数组{2,3,4,2,6,2,5,1}及滑动窗口的大小3，那么一共存在6个滑动窗口，他们的最大值分别为{4,4,6,6,6,5}； 针对数组{2,3,4,2,6,2,5,1}的滑动窗口有以下6个： {[2,3,4],2,6,2,5,1}， {2,[3,4,2],6,2,5,1}， {2,3,[4,2,6],2,5,1}， {2,3,4,[2,6,2],5,1}， {2,3,4,2,[6,2,5],1}， {2,3,4,2,6,[2,5,1]}。
 * @method maxInWindows
 * @date   2019-06-19
 * @author NZQ
 * @param  {array}     num  　数组
 * @param  {size}     size  窗口大小
 * @return {array}          数组
 */
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

console.log(maxInWindows([2, 3, 4, 2, 6, 2, 5, 1], 3));
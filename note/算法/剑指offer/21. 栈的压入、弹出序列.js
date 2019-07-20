/**
 * @Author nzq
 * @Date 2019/5/8
 * @Description: 输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）
 * @Param:
 * @Return:
 */

// 思路：
//  （1）当栈顶元素和popV[0] 相等时
//       1. stack
//  （2）不相等时
function IsPopOrder(pushV, popV) {
  let stack = [];

  while (true) {
    // （栈不为空）栈顶元素和popV[0] 相等时
    while (stack.length !== 0 && stack[stack.length - 1] === popV[0]) {
      stack.pop();
      popV.shift();
    }
    // pushV 不为空且 栈为空或栈顶元素和popV[0]不相等时, 就需要向里面添加元素
    while(pushV.length!==0 && (!stack[stack.length-1] || stack[stack.length-1] !== popV[0])) {
      stack.push(pushV.shift());
    }
    // popV 为空时
    if (popV.length === 0) {
      return true
      // pushV 为空且栈顶元素和popV[0]不相等时
    } else if((pushV.length === 0 && stack[stack.length-1] !== popV[0])) {
      return false;
    }
  }
}
console.log(IsPopOrder([1,2,3,4,5],[4,5,3,2,1]));


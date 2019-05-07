/**
 * @Author nzq
 * @Date 2019/5/8
 * @Description: 输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否可能为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如序列1,2,3,4,5是某栈的压入顺序，序列4,5,3,2,1是该压栈序列对应的一个弹出序列，但4,3,5,1,2就不可能是该压栈序列的弹出序列。（注意：这两个序列的长度是相等的）
 * @Param:
 * @Return:
 */

function IsPopOrder(pushV, popV) {
  // write code here
  let stack = []
    ,temp;
  for (let i = 0, len = popV.length; i < len; i++) {
    temp = popV.shift();
    // stack 长度为0
    if (!stack.length) {
      stack.push(...pushV.splice(0, pushV.indexOf(temp)+1))
    } else {
      let pushVTempNum = pushV.length && pushV.shift();
      if (stack[stack.length-1] !== temp && stack.indexOf(temp) !== -1 // popV 第一个元素在栈中其他位置
        || pushVTempNum !== temp && stack.indexOf(temp) === -1 // popV 第一个元素不在栈中，不在pushV的第一个元素
      ) {
        return false;
      } else if (pushVTempNum !== temp && stack.indexOf(temp) === 0) { // popV 第一个元素不在栈中，在pushV的第一个元素
        stack.push(pushVTempNum);
      }
    }
    stack.pop();
  }
  return true
}
console.log(IsPopOrder([1,2,3,4,5],[4,5,3,2,1]));

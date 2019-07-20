/**
 * @Author nzq
 * @Date 2019/5/7
 * @Description: 定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。
 * @Param:
 * @Return:
 */

let minNum
  ,stack = [];

function push(node)
{
  // write code here
  if (node < minNum) {
    minNum = node;
  }
  stack.push(node);
}
function pop()
{
  // write code here
  return stack.length === 0 ? null : stack.pop();
}
function top()
{
  // write code here
  return stack.length === 0 ? null : stack[stack.length-1];
}
function min()
{
  // write code here
  return Math.min.apply(this,stack);
}

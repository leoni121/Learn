/**
 * @Author nzq
 * @Date 2019/5/7
 * [包含min函数的栈](https://www.nowcoder.com/practice/4c776177d2c04c2494f2555c9fcc1e49?tpId=13&tqId=11173&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的min函数（时间复杂度应为O（1））。
 * @Param:
 * @Return:
 */

let minNum = Infinity, stack = [], min = [];

function push(node)
{
  // write code here
  if (node < minNum) {
    minNum = node;
  }
  min.push(minNum);
  console.log(minNum)
  stack.push(node);
}
function pop()
{
  // write code here
  min.pop();
  return stack.length === 0 ? null : stack.pop();
}
function top()
{
  // write code here
  return stack.length === 0 ? null : stack[stack.length-1];
}
function getMin()
{
  // write code here
  console.log(min)
  return min[min.length-1];
}


push(123)
push(21)
push(334)
push(22)
push(20012)
push(2023)
console.log(getMin())

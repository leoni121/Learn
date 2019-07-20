/**
 * @Author nzq
 * @Date 2019/4/27
 * @Description: 用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型。
 * @Param:
 * @Return:
 */
let stack1 = [],
  stack2 = [];

/**
 * stack1 用来装 push 的项
 * stack2 用来装 pop 的项
 * 当 stack2 是空时，如果 stack1 不为空，则把 stack1 中的项全部倒序放入stack2
 */
function push(node)
{
  // write code here
  stack1.push(node);
}
function pop()
{
  // write code here
  if (stack2.length === 0) {
    if (stack1.length === 0) {
      return null;
    } else {
      for (let i = 0, len = stack1.length; i < len; i++) {
        stack2.push(stack1.pop());
      }
      return stack2.pop();
    }
  } else {
    return stack2.pop();
  }
}

/**
 * @Author nzq
 * @Date 2019/4/16
 * [替换空格](https://www.nowcoder.com/practice/4060ac7e3e404ad1a894ef3e17650423?tpId=13&tqId=11155&rp=1&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 * @Description: 请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。
 * @Param:
 * @Return:
 */

function replaceSpace(str)
{
  return str.replace(/\s/g, '%20');
}

console.log(replaceSpace('We Are Happy.'));

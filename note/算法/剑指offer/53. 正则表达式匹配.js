/**
 * @Author nzq
 * @Date 19-6-15
 * @Description: 请实现一个函数用来匹配包括'.'和'*'的正则表达式。模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（包含0次）。 在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但是与"aa.a"和"ab*a"均不匹配
 * @Param:
 * @Return:
 */

// 思路：
//     比对字符相等情况，利用递归
function match(s, pattern)
{
  // write code here
  if (!s && !pattern) return true; // 相等的时候
  if (s && !pattern) return false; // 不相等

  if (pattern[1] === '*') { // 第二个是 "*" 号的时候
    if (pattern[0] === s[0] || (pattern[0]=='.' && s[0])) { // 第一个相等的时候
      // 匹配 0个 或者 多个
      return match(s, pattern.slice(2)) || match(s.slice(1), pattern);
    } else {
      return match(s, pattern.slice(2));
    }
  } else {
    if (pattern[0] === s[0] || (pattern[0]=='.' && s[0])) { // 第一个相等的时候
      return match(s.slice(1), pattern.slice(1));
    } else {
      return false;
    }
  }

}

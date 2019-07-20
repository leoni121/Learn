/**
 * @Author nzq
 * @Date 2019/5/27
 * @Description: 在一个字符串(0<=字符串长度<=10000，全部由字母组成)中找到第一个只出现一次的字符,并返回它的位置, 如果没有则返回 -1（需要区分大小写）.
 * @Param:
 * @Return:
 */

// 思路一：hashmap
function _FirstNotRepeatingChar(str)
{
  // write code here
  if(str.length ===0) {
    return -1;
  }
  let obj = {};
  for (let i = 0, len = str.length; i < len; i++) {
    if (obj[str[i]]) {
      obj[str[i]] ++;
    } else {
      obj[str[i]] = 1;
    }
  }
  for (let i = 0, len = str.length; i < len; i++) {
    if (obj[str[i]] === 1) {
      return i;
    }
  }
}


// 思路二：优化的循环
/*
function FirstNotRepeatingChar(str)
{
  // write code here
  if(str.length ===0) {
    return -1;
  }
  let isSingle = true;
  for (let i = 0, len = str.length; i < len; i++) {
    isSingle = true;
    for (let j = i + 1; j < len; j++) {
      if (str[i] === str[j]) {
        isSingle = false;
        break;
      }
    }

    if (isSingle) {
      return i;
    }
  }
}
*/

/**
 * @Author nzq
 * @Date 19-6-15
 * @Description:
 * [字符流中第一个不重复的字符](https://www.nowcoder.com/practice/00de97733b8e4f97a3fb5c680ee10720?tpId=13&tqId=11207&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 请实现一个函数用来找出字符流中第一个只出现一次的字符。例如，当从字符流中只读出前两个字符"go"时，第一个只出现一次的字符是"g"。当从该字符流中读出前六个字符“google"时，第一个只出现一次的字符是"l"。
 * @Param:
 * @Return:
 */

let map = {};
//Init module if you need
function Init() {
  // write code here
  map = {};
}
//Insert one char from stringstream
function Insert(ch) {
  // write code here
  if (!map[ch]) {
    map[ch] = 1;
  } else {
    map[ch]++;
  }
}
//return the first appearence once char in current stringstream
function FirstAppearingOnce() {
  for (var ch in map) {
    if (map.hasOwnProperty(ch)) {
      if (map[ch] === 1) {
        return ch;
      }
    }
  }
  return '#';
}

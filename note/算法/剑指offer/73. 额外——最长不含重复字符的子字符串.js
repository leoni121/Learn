

// 两个指针 end/start
function longestSubStringWithoutDuplication (str) {
  if(str.length <= 1) return str;
  let max = 0;
    start = -1,
    _str = '',
    end = 0,
    obj = {}; // 记录字符上次出现位置，没在
  
  // aba232323a312
  for(; end < str.length; end++) {
    // s[i]字符上次出现的下标是否在start之后，若是，则重复了，则修改start为上一次s[i]的位置，从它后一位开始搜索
    if(obj[str[end]] > start) start = obj[str[end]];
    obj[str[end]] = end;
    max = Math.max(max, end - start);
    _str = str.slice(start+1, end+1);
  }
  console.log(_str);
  return max;
}


// 思路二：动态规划
// 用f(i)表示以i个字符结尾不包含重复子字符串的最长长度，从左向右扫描
// 1、若第i个字符在之前没出现过，则 f(i) = f(i-1) + 1;
/*2、若第i个字符在之前出现过，
  计算第i个字符距离上次出现之间的距离为d
  (a)若d <= f(i-1)，则说明第i个字符上次出现在f(i-1)对应的不重复字符串之内，那么这时候更新 f(i) = d
  (b)若d > f(i-1)，则无影响,f(i) = f(i-1) + 1
*/

function _longestSubStringWithoutDuplication (str) {
  if (str.length == 0)
           return 0;
   let curLen = 0, // 当前不重复字符串的长度，对应 f(i)
      maxLen = 0, // 最大长度
      position = {}, // 记录字符上一次出现位置
      preIndex = 0, // 特定字符上一次出现位置
      d = 0; // 相同字符之间的距离
   
   for (let i = 0; i < str.length; i++){
       preIndex = position[str[i]]; 
       d = i - preIndex;
       if (!preIndex || d > curLen) { // 没出现过，或者 d>f(i-1)
           curLen++;
       } else{  // 出现过了 d<=f(i-1)
           maxLen  = curLen > maxLen ? maxLen : curLen;
           curLen = d  // f(i) = d
       }
       position[str[i]] = i; // 记录位置
   }
   maxLen =  maxLen > curLen ? maxLen : curLen;
   
   return maxLen;
}
console.log(_longestSubStringWithoutDuplication('arabcacfr'))
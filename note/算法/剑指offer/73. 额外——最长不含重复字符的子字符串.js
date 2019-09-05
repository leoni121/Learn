

// 两个指针 end/start
function longestSubStringWithoutDuplication (str) {
  if(str.length <= 1) return str;
  let max = 0,
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
    console.log(_str)
  }
  return max;
}

console.log(longestSubStringWithoutDuplication('arabcacfeer'))

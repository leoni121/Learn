function get (str) {
  let len = str.length;
  if (len <= 1) print(str)
  let stack = {},
    maxLen = 0,
    start = 0,
    end = 0,
    temp = 0,
    key;

  for (let i = 0;i<len;i++) {
    key = str[i];
    if (stack[key] !== undefined) {
      if (i - temp > maxLen) {
        maxLen = i - temp;
        end = i;
        temp = stack[key];
        start = temp;
      } else {
        console.log('as', temp, i, key)
        temp = stack[key];
      }
    }
    stack[key] = i;
  }
  if (end !==len-1 && len-1 - start > maxLen) {
    end = len;
  }
  console.log(start, end, str.slice(start, end));
}

get('abcabbjgj')

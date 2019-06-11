function getNumOfSubStr(str) {
  let temobj = {}
    ,length = str.length
    ,temStr = ""
    ,count = 0;
  if (length === 0) {
    return count;
  }

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length && length - j >= i; j++) {
      temStr = str.substr(j, i+1);
      if (!temobj[temStr]) {
        temobj[temStr] = 1;
        count++;
      }
    }
  }

  return {count, temobj}

}
// 从 0 一直累加到 total
/*(function count (total = 10,num2 = total) {
  if(total===0) {
    return num2;
  }
  --total
  return count(total, num2 + total)
})(10)*/

// console.log(getNumOfSubStr("UP! UP! JD"))
console.log(getNumOfSubStr("UP！UP！JD"))

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


// console.log(getNumOfSubStr("UP! UP! JD"))
console.log(getNumOfSubStr("UP！UP！JD"))

function get (str) {
  let len = str.length;
  let maxStr = "";
  let start = 0;
  let end = 0;
  str = str.split("").join("_");

  for(let i = 0 ; i < len ; i++ ) {
    start = i - 1;
    end = i + 1;
    while(start >= 0 && end < len && str[start] === str[end]) {
      start -- ;
      end ++;
    }
    if(end - start + 1 > maxStr.length) {
      maxStr = str.substring(start, end + 1);
    }
  }

  return maxStr.split("_").join("");
}


console.log(get("1231231231"))

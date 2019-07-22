/*
    str1-x  1 2 3 4 5 6 7
str2-y
1
2
3
4
5
6
7



 */

function getLongstSubStr(str1, str2) {
  if(str1.length === 0 || str2.length === 0) return '';
  let x = str1.length,
    y = str2.length,
    record  = [],
    max = [0, 0];

  // 初始化 vector
  for(let i = 0; i < y; i++) {
    record[i] = [];
  }

  for(let i = 0; i < y; i++) {
    for(let j = 0; j < x; j++) {
      if(str2[i] === str1[j]) {
        if(i === 0 || j===0) {
          record[i][j] = 1;
        } else {
          record[i][j] = 1 + (record[i-1][j-1] ? record[i-1][j-1] : 0);
        }
        // console.log(record[i][j], record[max[0]][max[1]], max)
        if(record[i][j] > record[max[0]][max[1]]) {
          max = [i, j];
        }
      } else {
        record[i][j] = 0;
      }
    }
  }

  console.log(record);

  return str2.slice(max[0]-4, max[0]+1)
}

let str='acbcbcef',str2='abcbced';
console.log(getLongstSubStr(str, str2));

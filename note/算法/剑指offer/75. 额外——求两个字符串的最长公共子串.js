/** str1: acbcbcef; str2: abcbced
      str1-x  1 2 3 4 5 6 7 8
str2-y        a c b c b c e f
    1 a       1 0 0 0 0 0 0 0
    2 b       0 0 1 0 1 0 0 0
    3 c       0 1 0 2 0 2 0 0
    4 b       0 0 1 0 3 0 0 0
    5 c       0 1 0 1 0 4 0 0
    6 e       0 0 0 0 0 0 5 0
    7 d       0 0 0 0 0 0 0 0
 */

//　思路：连续子字符串就是　一条条从 左上到右下的线长
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

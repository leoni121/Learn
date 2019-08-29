/**
 * @Author nzq
 * @Date 2019/8/29
 * @Description:
 * @Param:
 * @Return:
 */

const print = console.log;

/*
let line, n;
/!*while ((n = readInt())) {
  line = read_line();
}*!/
n = 7;
// line = 'AaAAAA';
line = 'aAAaaaa';

let count = 0,
  small = 'a'.charCodeAt(0),
  big = 'Z'.charCodeAt(0),
  preStatus = 'small'; // big

// print(n+Math.min(count, n-count));
let smallNum = 0;
for (let i = 0; i < n; i++) {
  if (line[i].charCodeAt(0)>=small) {
    smallNum++;
  }
}
if (smallNum <= Math.floor(n / 2)) {
  smallNum = 0;
  for (let i = 0; i < n; i++) {
    if (preStatus === 'small' && line[i].charCodeAt(0)<=big) {
      preStatus = 'big';
      if (smallNum >= 2) {
        count+=2;
      } else {
        count ++;
      }
      smallNum = 0;
    } else if (preStatus === 'big' && line[i].charCodeAt(0)>=small) {
      preStatus = 'small';
      smallNum++;
    }
  }
} else {
  let bigNum = 0;
  for (let i = 0; i < n; i++) {
    if (preStatus === 'small' && line[i].charCodeAt(0)<=big) {
      preStatus = 'big';
      bigNum++;
    } else if (preStatus === 'big' && line[i].charCodeAt(0)>=small) {
      preStatus = 'small';
      if (bigNum >= 2) {
        count+=2;
      } else {
        count ++;
      }
      bigNum = 0;
    }
  }
}

print(count + n)
*/




////////////////////////////////////////////////////////////////////////
/*
let line, arr = [], stack = {};

/!*while((line = read_line())) {
  arr.push(line.split(" "));
}*!/
arr = [
  ['ZHANG','SAN'],
  ['LI','SI'],
  ['WANG', 'WU'],
  ['WANG', 'LIU'],
  ['WANG', 'QI'],
  ['ZHANG', 'WU'],
  ['LI', 'WU'],
];

for (let i = 0; i < arr.length; i++) {
  if (stack[arr[i][0]]) {
    stack[arr[i][0]]++;
  } else {
    stack[arr[i][0]] = 1;
  }
}
arr.sort(function (pre, cur) {
  if (pre[0] !== cur[0] && stack[pre[0]] !== stack[cur[0]]) return stack[cur[0]] - stack[pre[0]];
})

for (let i = 0; i < arr.length; i++) {
  print(arr[i].join(" "))
}*/



////////////////////////////////////////////////////////////////////////
let line, n,
  small = 'a'.charCodeAt(0),
  big = 'Z'.charCodeAt(0);


/*while ((n = readInt())) {
  line = read_line();
}*/
n = 8;
line = 'AaaaaAaAA';
let preStatus = 'small',
  smallNum = 0,
  bigNum = 0,
  count = 0;

smallNum = 0;
bigNum = 0;
for (let i = 0; i < n; i++) {
  if (preStatus === 'small' && line[i].charCodeAt(0) <= big) { // 小=> 大
    preStatus = 'big';
    if (i === 0) count++;
    if (smallNum >= 2) count++;
    smallNum = 0;
  } else if (preStatus === 'small' && line[i].charCodeAt(0) >= small) { // 小=>小
    smallNum++;
  } else if (preStatus === 'big' && line[i].charCodeAt(0) >= small) { // 大=>小
    preStatus = 'small';
    if (bigNum >= 2) count++;
    bigNum = 0;
  } else if (preStatus === 'big' && line[i].charCodeAt(0) <= big) { // 大 => 大
    bigNum++;
  }
}
count++;
print(count + n)

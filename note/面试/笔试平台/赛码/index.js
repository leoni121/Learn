/**
 * 赛码网输入、输出使用方式：
 * 1.
 * while ((N=readInt()) != null && (M=readInt()) != null) {
    print (N + ' ' + M);
    let arr = [];
    for (let i=0; i<M; i++) {
      for(let j = 0;j<3;j++) {
        arr.push(readInt());
      }
      print(...arr);
      arr = [];
    }
  }

  2.
   let line;
   while ((line = read_line())) {
    [N, M] = line.split(" ");
    print (N + ' ' + M);
    let arr = [];
    for (let i=0; i<M; i++) {
      let _line = read_line();
      print(..._line.split(" "));
      arr = [];
    }
  }
 */

const print = console.log;
/*let n, stack = [], line;

let A_ASCII = 'A'.charCodeAt(0);
for (let i = 0; i < 13; i++) {
  stack.push({
    num: 0,
    mine: false,
  });
}

while ((n=readInt()) != null) {
  line = read_line().split("");
  for (let i = 0; i < line.length; i++) {
    stack[line[i].charCodeAt(0)-A_ASCII].mine = true;
  }
  line = read_line().split(" ");
  for (let i = 0; i < line.length; i++) {
    stack[i].num = parseInt(line[i]);
  }

  let max  = -Infinity, maxIdx;
  for (let i = 0; i < 13; i++) {
    if (!stack[i].mine) {
      if (stack[i].num > max) {
        max = stack[i].num;
        maxIdx = i;
      }
    }
  }
  const res = String.fromCharCode(A_ASCII+maxIdx);
  print(res);
}*/

/**
 *       1  2  3
 *    $1 @     @
 *    $2
 *    $3 @  @
 *
 *    1. 统计不会语言的人数
 *    2. 语言按人数多到少排序
 *    3. 查找是否存在会前一个和后一个语言的
 *    4. 标记连通性
 * */

/*let n,
  m,
  k,
  man,
  lanuage,
  peopleArr, // n， 会几门语言
  lanuageArr; // m， 被几个人会
let res = 0; // 学习节个数
while((n=readInt()) != null && (m=readInt()) != null && (k=readInt()) != null) {
  peopleArr = new Array(n+1);
  lanuageArr = new Array(m+1).fill(0);
  while(k--) {
    [man, lanuage] = read_line().split(" ");
    if (!peopleArr[man]) peopleArr = [];
    peopleArr[man].push(lanuage);

    if(!lanuageArr[lanuage]){
        lanuageArr[lanuage] = {num: 0};
    }
    lanuageArr[lanuage].lang = lanuage;
    lanuageArr[lanuage].num++;
  }

  // 改
  lanuageArr.sort((pre, cur) => cur.num - pre.num);
  lanuageArr.pop();
  lanuageArr.unshift({num: 0});

  // 统计不会语言得人
  let cantLan =  0;
  for (let i = 1; i < peopleArr.length; i++) {
    if (!peopleArr[i]) {
      peopleArr[i] = [];
      peopleArr[i].push(lanuageArr[1].lang);
      cantLan++;
    }
  }
  res+=cantLan;
  lanuageArr[1].num += cantLan;

  // 找会 lanuageArr[1] 语言的人有没有人会 lanuageArr[2]; 类推
  let curLang, nextLang, mark = false;
  for (let i = 1; i < lanuageArr.length-1 && lanuageArr[i+1].num!==0; i++) {
    curLang = lanuageArr[i].lang;
    nextLang = lanuageArr[i+1].lang;
    mark = false;
    for (let j = 1; j < peopleArr.length; j++) {
      if (peopleArr[j].indexOf(curLang)!==-1 && peopleArr[j].indexOf(nextLang)!==-1) {
        mark = true;
        break;
      }
    }
    if (!mark) {
      res++;
    }
  }
  print(res)
}*/

let n,
  m,
  k,
  man,
  lanuage,
  peopleArr, // n， 会几门语言
  lanuageArr; // m， 被几个人会
let res = 0; // 学习节个数

lanuageArr = [{num: 0}, {lang: 1, num: 1}, {num: 0}, {lang: 3, num: 1}];
peopleArr = [0, 0, [3], [1]];
  lanuageArr.sort((pre, cur) => cur.num - pre.num);
  lanuageArr.pop();
  lanuageArr.unshift({num: 0});

  // 统计不会语言得人
  let cantLan =  0;
  for (let i = 1; i < peopleArr.length; i++) {
    if (!peopleArr[i]) {
      peopleArr[i] = [];
      peopleArr[i].push(lanuageArr[1].lang);
      cantLan++;
    }
  }
  res+=cantLan;
  lanuageArr[1].num += cantLan;

  // 找会 lanuageArr[1] 语言的人有没有人会 lanuageArr[2]; 类推
  let curLang, nextLang, mark = false, langMarkArr = [undefined, true];
 lanuageArr[1].mark = true; // 标记连通性
  for (let i = 1; i < lanuageArr.length-1 && lanuageArr[i+1].num!==0; i++) {
    curLang = lanuageArr[i].lang;
    nextLang = lanuageArr[i+1].lang;
    mark = false;
    if (!langMarkArr[i].mark) {
      for (let j = 1; j < peopleArr.length; j++) { // 遍历对应的人数
        if (peopleArr[j].length >= 2 && peopleArr[j].indexOf(curLang)!==-1) {
          for (let )
            if (peopleArr[j].indexOf(nextLang) !== -1) {
              mark = true;
            } else {
              langMarkArr[j]
            }
        }
      }

      if (!mark) {
        res++;
      }
    }
  }
  print(res)

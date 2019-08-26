const print = console.log;

/*
// 笛卡尔乘积
/!*
* arr = [
    ['a1', 'a2', 'a3'],
    ['b1', 'b2'],
  ]
* *!/

/!*
 arr = [
   ['a1'],
   ['b1', 'b2'],
   ['c1', 'c2'],
 ]
* *!/
function genCartesian () {
  // 本题为考试单行多行输入输出规范示例，无需提交，不计分。
  let arr = [],
    line,
    idx = 0;
  /!*while(line=readline()) {
    arr[idx++] = line.split(' ');
  }*!/
  arr = [
    ['a1'],
    ['b1', 'b2'],
    ['c1', 'c2'],
  ]
  let res = get(arr);
  console.log(res.join(","));
}


function get(arr) {
  let len = arr.length;
  if (len <= 1) return arr[0];

  let _res = get(arr.slice(1)),
    res = [];
  for (let i = 0; i < arr[0].length; i++) {
    for (let j = 0; j < _res.length; j++) {
      res.push(arr[0][i] + " " + _res[j]);
    }
  }
  return res;
}

genCartesian();
*/


/*排序*/
/*let list = [],
  sortKey = readline().split(" "),
  allKey = readline().split(" "),
  line,
  idx = 0;

while(line=readline()) {
  line = line.split(" ");
  let temp = list[idx++] = {};
  for (let i = 0; i < line.length; i++) {
    temp[allKey[i]] = line[i];
  }
}

let list = [
  {col1: 2, col2: 10},
  {col1: 2, col2: 20},
  {col1: 1, col2: 20},
  {col1: 1, col2: 10},
  {col1: 1, col2: 10},
  {col1: 3, col2: 10},
  {col1: 3, col2: 20},
],
  sortKey = ['col1', 'col2'],
  allKey = ['col1', 'col2'];

sortBy(list, sortKey)

function sortBy(list, cols) {
  let preVal, curVal;
  list.sort((pre, cur) => {
    for (let i = 0; i < cols.length; i++) {
      preVal = pre[cols[i]];
      curVal = cur[cols[i]];
      if (preVal !== curVal && typeof preVal === 'number' && typeof curVal === 'number') {
        return preVal - curVal;
      }
    }
  })
  let str = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < allKey.length; j++) {
      str.push(list[i][allKey[j]]);
    }
    console.log(str.join(" "));
    str = [];
  }
}
*/


/* 判断迷宫是否有路, 0  通过, 1 障碍 */
/*let line = readLine().split(" "),
  start = {x: line[0], y: line[1]},
  end = {x: line[2], y: line[3]},
  map = [],
  _map = [],
  idx = 0;

while(line=readline()) {
  map.push(line.split(" "));
  _map[idx++] = [];
}
let maxX = map.length-1,
  maxY = map[0].length-1;

hasPath(map, start, end);

function hasPath(map, start, end) {
  if (check(map, start, end)) print(1);
  print(0);
}

function check (map, cur, end) {
  let {x1, y1} = cur, {x2, y2} = end;
  if (x1 >= 0 && x1 <= maxX && y1 >= 0 && y1 <= maxY) {
    // 终点
    if (x1 === x2 && y1 ===y2) return true;

    let s, x, z, y;
    // 上
    if (x1 - 1 >= 0 && map[x1 - 1][y1] === 0 && !_map[x1 - 1][y1]) {
      s = check(map, {x: x1-1, y: y1}, {x: x2, y: y2});
    }
    // 下
    if (x1 + 1 <= maxX && map[x1 + 1][y1] === 0 && !_map[x1 + 1][y1]) {
      x = check(map, {x: x1+1, y: y1}, {x: x2, y: y2});
    }
    // 左
    if (y1 - 1 >= 0 && map[x1][y1 - 1] === 0 && !_map[x1][y1 - 1]) {
      z = check(map, {x: x1, y: y1 - 1}, {x: x2, y: y2});
    }
    // 右
    if (y1 + 1 <= maxY && map[x1][y1 + 1] === 0 && !_map[x1][y1 + 1]) {
      y = check(map, {x: x1, y: y1 + 1}, {x: x2, y: y2});
    }

    return s || x || z || y;
  } else {
    return false
  }
}*/

/*let line = readLine().split(" "),
  start = {x: line[0], y: line[1]},
  end = {x: line[2], y: line[3]},
  map = [];

let tempArr = [];
while(line=readline()) {
  tempArr = line.split(" ");
  for(let j = 0;j < tempArr.length; j++){
    tempArr = parseInt(tempArr[j]);
  }
  map.push(tempArr);
}*/
/*let start = {x: 0, y: 0},
  end = {x: 5, y: 4},
  map = [
    [0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [1, 1, 1, 0, 0],
    [0, 1, 0, 0, 1],
    [0, 1, 0, 0, 0],
  ]*/
let start = {x: 0, y: 0},
  end = {x: 4, y: 0},
  map = [
    [0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [1, 1, 1, 0, 0],
    [0, 1, 0, 0, 1],
    [0, 1, 0, 0, 0],
  ]
let maxX = map.length-1,
  maxY = map[0].length-1;

hasPath(map, start, end);

function hasPath(map, start, end) {
  if (check(map, start, end)) {
    print(1)
  } else {
    print(0);
  }
}

function check (map, cur, end) {
  let {x: x1, y: y1} = cur, {x: x2, y: y2} = end;
  if (x1 >= 0 && x1 <= maxX && y1 >= 0 && y1 <= maxY) {
    // 终点
    if (x1 === x2 && y1 ===y2) return true;

    let s, x, z, y;
    // 上
    if (x1 - 1 >= 0 && map[x1 - 1][y1] === 0) {
      map[x1 - 1][y1] = 1;
      s = check(map, {x: x1-1, y: y1}, {x: x2, y: y2});
    } else {
      s = false;
    }
    // 下
    if (x1 + 1 <= maxX && map[x1 + 1][y1] === 0) {
      map[x1 + 1][y1] = 1;
      x = check(map, {x: x1+1, y: y1}, {x: x2, y: y2});
    } else {
      x = false;
    }
    // 左
    if (y1 - 1 >= 0 && map[x1][y1 - 1] === 0) {
      map[x1][y1 - 1] = 1;
      z = check(map, {x: x1, y: y1 - 1}, {x: x2, y: y2});
    } else {
      z = false;
    }
    // 右
    if (y1 + 1 <= maxY && map[x1][y1 + 1] === 0) {
      map[x1][y1 + 1] = 1;
      y = check(map, {x: x1, y: y1 + 1}, {x: x2, y: y2});
    } else {
      y = false;
    }

    return s || x || z || y;
  } else {
    return false
  }
}

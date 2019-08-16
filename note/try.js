/**
* 第一行包含两个整数N和M，1≤N，M≤1000。

接下来N行，每行包含M个整数，第i行的第j个整数表示Ai,j。

输出
输出表面积的大小。


样例输入
2 2
2 1
1 1
样例输出
20
* */
function print (...arg) {
  console.log(arg)
}
/*

function get() {
  /!*let [n, m] = read_line().split(" ");
  let arr = [];
  for (let i = 0;i<n;i++) {
    arr.push(read_line().split(" "));
  }*!/
  let n =2, m = 2, arr= [[2, 1], [1, 1]];
  // let n = 1, m = 2, arr = [[1, 1]];
  let res = 2 * n * m; // 顶部
  let cur = 0,
    diff = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      cur = arr[i][j];
      diff = 0;

      // 上
      if (i - 1 < 0) {
        res += cur;
      } else {
        diff = cur - arr[i - 1][j];
        res += (diff > 0 ? diff : 0);
      }

      // 下
      if (i + 1 >= n) {
        res += cur;
      } else {
        diff = cur - arr[i + 1][j];
        res += (diff > 0 ? diff : 0);
      }

      // 左
      if (j - 1 < 0) {
        res += cur;
      } else {
        diff = cur - arr[i][j - 1];
        res += (diff > 0 ? diff : 0);
      }

      // 右
      if (j + 1 >= m) {
        res += cur;
      } else {
        diff = cur - arr[i][j + 1];
        res += (diff > 0 ? diff : 0);
      }
    }
  }

  print(res);
}

get();
*/



/**
* 输入第一行包含两个正整数n,m分别表示数字含有n位，和在m进制下。

输入第二行和第三行分别包含n个整数，中间用空格隔开，每个整数都在0到m-1之间。每行第i个数表示的是当前数第i位上的数字。

输出
输出包含n个数字，中间用空格隔开，表示得到的最大的数字，从高位到低位输出，如6在2进制下输出3位的结果是1 1 0。


样例输入
5 5
4 4 1 1 1
4 3 0 1 2
样例输出
4 4 3 3 2

提示
4 4 1 1 1 →1 4 1 4 1
4 3 0 1 2 →3 0 2 4 1（重排序列不唯一，数位相加后的数字为 4 4 3 8 2，对5取模即可 ）
* */
function get() {
/*  let [n, m] = read_line().split("");
  let arr1 = read_line().split(""),
    arr2 = read_line().split("");*/
let n = 5,m=5;
let arr1 = [4,4,1,1,1 ];
let arr2 = [4,3,0,1,2,];
  let obj1 = {}, obj2 = {};
  for (let i = 0; i < n; i++) {
    if(!obj1[arr1[i]]) {
      obj1[arr1[i]] = 1;
    } else {
      obj1[arr1[i]] += 1;
    }

    if(!obj2[arr2[i]]) {
      obj2[arr2[i]] = 1;
    } else {
      obj2[arr2[i]] += 1;
    }
  }

  let res = '',temp, idx = 0, count=0, arr4 = [];
  while (count<=n) {
    idx++;
    for (let key in obj1) {
      if (obj1[key] == '0'){
        count++;
      } else {
        temp = m - idx - parseInt(key);
        if (obj2[temp] !='0') {
          obj1[key] --;
          obj2[key] --;
          res += (temp + parseInt(key))+' ';
          arr4.push((temp + parseInt(key)))
        }
      }
    }
  }
  print(...arr4);
}


get()

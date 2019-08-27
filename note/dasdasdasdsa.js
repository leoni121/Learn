let [n, m] = read_line().split(" ");
n = parseInt(n);
m = parseInt(m);
let arr = [],stack = [];
for (let i = 0;i<n;i++) {
  arr[i] = read_line().split(" ");
}

let res = 2 * n * m; // 顶部
let cur = 0,
  diff = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    cur = parseInt(arr[i][j]);
    diff = 0;

    // 上
    if (i - 1 < 0) {
      res += cur;
    } else {
      diff = cur - parseInt(arr[i - 1][j]);
      res += (diff > 0 ? diff : 0);
    }

    // 下
    if (i + 1 >= n) {
      res += cur;
    } else {
      diff = cur - parseInt(arr[i + 1][j]);
      res += (diff > 0 ? diff : 0);
    }

    // 左
    if (j - 1 < 0) {
      res += cur;
    } else {
      diff = cur - parseInt(arr[i][j - 1]);
      res += (diff > 0 ? diff : 0);
    }

    // 右
    if (j + 1 >= m) {
      res += cur;
    } else {
      diff = cur - parseInt(arr[i][j + 1]);
      res += (diff > 0 ? diff : 0);
    }
  }
}

print(res);

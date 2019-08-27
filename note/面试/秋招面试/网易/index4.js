/**
 * @Author nzq
 * @Date 2019-08-03
 * @Description:
 * @Param:
 * @Return:
 */
function _get() {
  let n, q, arr = [], opArr = [], lines, num;
  lines =  readline().split(' ');
  n = parseInt(lines[0]);
  q = parseInt(lines[1]);
  arr = readline().split(' ');
  for(let i =0;i<arr.length;i++) {
    arr[i] = parseInt(arr[i])
  }
  while(opArr.length !== q) {
    opArr.push(parseInt(readline().split(' ')[0]));
  }

  for (let i = 0; i < q; i++) {
    num = 0;
    for(let j = 0;j<n;j++) {
      if (arr[j] >= opArr[i]) {
        arr[j] -= 1;
        num++;
      }
    }
    print(num);
  }
}

function __get () {
  let n, q, arr = [], lines, op, num;
  lines = readline().split(' ');
  n = parseInt(lines[0]);
  q = parseInt(lines[1]);
  arr = readline().split(' ');
  for(let i =0;i<arr.length;i++) {
    arr[i] = parseInt(arr[i])
  }
  while (q) {
    q--;
    op = parseInt(readline().split(' ')[0]);

    num = 0;
    for (let j = 0; j < n; j++) {
      if (arr[j] >= op) {
        arr[j] -= 1;
        num++;
      }
    }
    print(num);
  }
}

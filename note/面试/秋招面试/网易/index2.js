/**
 * @Author nzq
 * @Date 2019-08-03
 * @Description:
 * @Param:
 * @Return:
 */

function get (n, arr) {
 /* let n = 0,
    arr = [],
    line;
  line = readline().split(' ');
  n = parseInt(line[0]);

  line = readline().split(' ');
  arr = line;*/

  let max=[], temp = [], len = arr.length;
  for (let i = 0; i < n; i++) {
    for(let start=0,end =i; end < len; start++,end++) {
      temp.push(getMax(arr.slice(start, end+1)));
    }
    max.push(getMin(temp));
    temp = [];
  }
  let str = "";
  for(let i = 0;i<max.length;i++) str+=max[i] + " ";
  str = str.trim();
  console.log(str)
}


function getMax (arr) {
  let max = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    max = max < arr[i] ? arr[i] : max
  }
  return max;
}
function getMin (arr) {
  let min = Infinity;
  for (let i = 0; i < arr.length; i++) {
    min = min > arr[i] ? arr[i] : min
  }
  return min;
}

get(6, [1, 3, 2, 4, 6, 5])

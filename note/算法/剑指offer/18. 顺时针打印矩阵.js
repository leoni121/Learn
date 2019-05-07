/**
 * @Author nzq
 * @Date 2019/5/6
 * @Description: 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字，例如，如果输入如下4 X 4矩阵： 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 则依次打印出数字1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.
 * @Param:
 * @Return:
 */

// 自己完成
// 思路：一直逆时针方向旋转
/*
function printMatrix(matrix)
{
  // write code here
  let printArr = [];
  matrix.totalLen = matrix.length * matrix[0].length;

  right(matrix, 0, 0, printArr);
  return printArr;
}

function right (arr, x, y, printArr) {
  if (arr[x] === undefined || arr[x][y] === undefined) {
    bottom(arr, ++x, y-1, printArr);
  } else {
    printArr.push(arr[x][y]);
    if (printArr.length === arr.totalLen) return;
    arr[x][y] = undefined;
    right(arr, x, ++y, printArr);
  }
}

function bottom (arr, x, y, printArr) {
  if (arr[x] === undefined || arr[x][y] === undefined) {
    left(arr, x-1, --y, printArr);
  } else {
    printArr.push(arr[x][y]);
    if (printArr.length === arr.totalLen) return;
    arr[x][y] = undefined;
    bottom(arr, ++x, y, printArr);
  }
}

function left (arr, x, y, printArr) {
  if (arr[x] === undefined || arr[x][y] === undefined) {
    top(arr, --x, y+1, printArr);
  } else {
    printArr.push(arr[x][y]);
    if (printArr.length === arr.totalLen) return;
    arr[x][y] = undefined;
    left(arr, x, --y, printArr);
  }
}

function top (arr, x, y, printArr) {
  if (arr[x] === undefined || arr[x][y] === undefined) {
    right(arr, x+1, ++y, printArr);
  } else {
    printArr.push(arr[x][y]);
    if (printArr.length === arr.totalLen) return;
    arr[x][y] = undefined;
    top(arr, --x, y, printArr);
  }
}
*/

// 参考
// 思路：一圈一圈旋转
function printMatrix(matrix)
{
  // write code here
  let row=matrix.length;
  let col=matrix[0].length;
  let res=[];
  if(row===0||col===0){
    return res;
  }
  let left=0,
    top=0,
    right=col-1,
    bottom=row-1;
  while(left<=right&&top<=bottom){
    // 左到右
    for(let i=left;i<=right;i++) {
      res.push(matrix[top][i]);
    }

    // 上到下
    for(let i=top+1;i<=bottom;i++) {
      res.push(matrix[i][right]);
    }

    if(top!==bottom) {
      // 右到左
      for(let i=right-1;i>=left;i--) {
        res.push(matrix[bottom][i]);
      }
    }

    // 下到上
    if(left!==right) {
      for(let i=bottom-1;i>top;i--) {
        res.push(matrix[i][left]);
      }
    }
    left++;
    top++;
    right--;
    bottom--;
  }
  return res;
}

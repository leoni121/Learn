/**
 * @Author nzq
 * @Date 19-6-19
 * @Description: 地上有一个m行和n列的方格。一个机器人从坐标0,0的格子开始移动，每一次只能向左，右，上，下四个方向移动一格，但是不能进入行坐标和列坐标的数位之和大于k的格子。 例如，当k为18时，机器人能够进入方格（35,37），因为3+5+3+7 = 18。但是，它不能进入方格（35,38），因为3+5+3+8 = 19。请问该机器人能够达到多少个格子？
 * @Param:
 * @Return:
 */

function sum(rest) {
  let count = 0;
  for (let i = 0, len = rest.length; i < len; i++) {
    count+= +rest[i];
  }
  return count;
}

function movingCount(threshold, rows, cols)
{
  // write code here
  if (threshold < 0) return 0;
  if (threshold === 0 && rows > 0 && cols > 0) return 1;
  let flag = [];
  return trval(0, 0, rows, cols, threshold, flag);
}

function trval (i, j, rows, cols, threshold, flag) {
  //　回调结束条件
  if (i < 0
    || i >= rows
    || j < 0
    || j >= cols
    || sum((i + '' + j).split('')) > threshold
    || flag[i * cols + j]
  ) {
    return 0;
  }

  let count = 0;
  flag[i * cols + j] = true;

  count += trval(i-1, j, rows, cols, threshold, flag); //　上
  count += trval(i+1, j, rows, cols, threshold, flag); //　下
  count += trval(i, j-1, rows, cols, threshold, flag); //　左
  count += trval(i, j+1, rows, cols, threshold, flag); //　右

  return count+1;
}
console.log(movingCount(1, 2,2))

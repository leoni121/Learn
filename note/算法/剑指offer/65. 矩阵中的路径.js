/**
 *[矩阵中的路径](https://www.nowcoder.com/practice/c61c6999eecb4b8f88a98f66b273a3cc?tpId=13&tqId=11218&rp=2&ru=/ta/coding-interviews&qru=/ta/coding-interviews/question-ranking)
 请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。如果一条路径经过了矩阵中的某一个格子，则之后不能再次进入这个格子。 例如 a b c e s f c s a d e e 这样的3 X 4 矩阵中包含一条字符串"bcced"的路径，但是矩阵中不包含"abcb"路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入该格子。
 * @method hasPath
 * @date   2019-06-19
 * @author NZQ
 * @param  {Array}   matrix   矩阵
 * @param  {number}   rows    行数, 一层数组 length
 * @param  {number}   cols    列数, 二层数组　length
 * @param  {str}   path   　路径
 * @return {Boolean}         Boolean
 */

/**
 * 和秋招 Shopee 的题目有差异*/
/*
  ｉ＝　２；　j = ３
* 　＃　＃　＃
*  ＃　＃　＃
*
* */
// 上下左右
const DIRECTION = [[0, -1], [0, 1], [-1, 0], [1, 0]];

function hasPath(matrix, rows, cols, path) {
  // write code here
  if (!matrix.length
    || path.length > matrix.length
    || cols <= 0
    || rows <= 0)
  {
    return false;
  }
  //　长度为 0 返回 true;
  if (!path.length) return true;

  //标志位
  let flag = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // 循环遍历二维数组，找到起点等于str第一个元素的值，再递归判断四周是否有符合条件的----回溯法
      if (judge(matrix, i, j, rows, cols, flag, path, 0)) return true;
    }
  }

  return false;

}

// judge(初始矩阵，索引行坐标i，索引纵坐标j，矩阵行数，矩阵列数，待判断的字符串，字符串索引初始为0即先判断字符串的第一位)
function judge (matrix, i, j, rows, cols, flag, path, k) {
  // 先根据i和j计算匹配的第一个元素转为一维数组的位置
  let idx = i*cols+j;

  // 递归终止条件
  if (i<0 // 超出范围
    ||　j<0
    ||　i>=rows
    ||　j>=cols
    ||　matrix[idx] !== path[k] // 不相等
    || flag[idx]) // 已访问
  {
    return false;
  }

  //　若k已经到达str末尾了说明之前的都已经匹配成功了　
  // 或者ｐａｔｈ　长度是１，直接返回true
  // 已知 本次比较相等
  if (k === path.length - 1) return true;

  //　要走的第一个位置置为true，表示已经走过了
  flag[idx] = true;

  let r,c;
  // 判断是个方向
  for(let p = 0; p< DIRECTION.length; p++) {
    [r,c] = DIRECTION[p];
    if (judge(matrix, i+r, j+c, rows, cols, flag, path, k+1)) return true;
  }

  // 走到这，说明这一条路不通，还原，再试其他的路径
  flag[idx] = false;
  return false;
}

console.log(hasPath("ABCEHJIGSFCSLOPQADEEMNOEADIDEJFMVCEIFGGS",5,8,"SGGFIECVAASABCEHJIGQEM"));
/**
 * ABCEHJIG ABCEHJIG
 * SFCSLOPQ S      Q
 * ADEEMNOE A      E
 * ADIDEJFM A      M
 * VCEIFGGS VCEIFGGS
 */

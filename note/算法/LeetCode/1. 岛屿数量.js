/**
 *  给定'1's（土地）和'0's（水）的2d网格图，计算岛屿的数量。岛被水包围，通过水平或垂直连接相邻的土地而形成。您可以假设网格的所有四个边都被水包围。
 *  如果两个1相邻代表是一个岛屿
 * 输入：
     11110
     11010
     11000
     00000
    输出：1
 {{11110},{11010},{11000},{00000}}
    输入：
     11000
     11000
     00100
     00011
 {{11000},{11000},{00100},{00011}}
     输出： 3
 */


// 思路：
// 1.首先判断给定的二维数组是不是空的。
// 2.对二维数组遍历一下，对每个元素进行判断。
//   （1）如果这个值等于1， 那么就把计数器+1, 并且对该元素四周进行深度搜索，将遍历过得格子的值改成“1”。
//   （2）继续 “2.” 中的步骤。
//3.返回。

let __count = 0;
function numIslands(grid) {
    if(!grid.length || !grid[0].length) return 0; //测试用例中是否有空测试样例
    let count = 0;
    for(let i=0; i < grid.length; i++){
        for(let j=0; j < grid[0].length; j++){
            __count++;
            if(grid[i][j] == '1'){
                count++;
                dfs(grid, i, j);
            }
        }
    }
    return count;
}
function dfs(grid, i, j){
    if(i >= grid.length || i < 0 || j>= grid[0].length || grid[i][j] != '1') return;

    console.log(__count++);
    // 属于同一个岛屿
    grid[i][j] = '0'; // 置1
    // 看周围是不是属于岛屿
    dfs(grid, i+1, j);
    dfs(grid, i, j+1);
    dfs(grid, i-1, j);
    dfs(grid, i, j-1);
};

numIslands([
  [1,1,1,1,0],
  [1,1,0,1,0],
  [1,1,0,0,0],
  [0,0,0,0,0],
])
console.log(__count);

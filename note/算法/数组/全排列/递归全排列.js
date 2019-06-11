/**
 * @Author nzq
 * @Date 2019/5/7
 * @Description: 参考 —— https://www.jianshu.com/p/6e7f88ead393
 * @Param:
 * @Return:
 */

class Permutation {
  constructor(arr) {
    this.arr = Array.from(arr);
    this.result = [];
    this.len = 0;
    this.run(0);
  }

  run(index) {
    if (index === this.arr.length - 1) {
      this.result.push(Array.from(this.arr));
      this.len++;
      return;
    }
    for(let i = index; i < this.arr.length; i++) {
      // 将第一个和其他位置的数交换
      [this.arr[index], this.arr[i]] = [this.arr[i], this.arr[index]];
      // 全排序后面侧
      this.run(index + 1);
      // 将先前交换的数再 交换回来
      [this.arr[index], this.arr[i]] = [this.arr[i], this.arr[index]];
    }
  }
}

let p = new Permutation(["A", "B", "C"]);
console.log(p.result);
console.log(p.len);
// [ [ 'A', 'B', 'C' ],
//   [ 'A', 'C', 'B' ],
//   [ 'B', 'A', 'C' ],
//   [ 'B', 'C', 'A' ],
//   [ 'C', 'B', 'A' ],
//   [ 'C', 'A', 'B' ] ]
// 6

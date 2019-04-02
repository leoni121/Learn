/**
 * @Author nzq
 * @Date 2019/4/2
 * @Description:
 * @Param:
 * @Return:
 */
let log  = console.log;
log(__filename);
log(__dirname);

console.info("程序开始执行：");

var counter = 10;
console.log("计数: %d", counter);

console.time("获取数据1");
//
// 执行一些代码
//
console.timeEnd('获取数据1');

console.info("程序执行完毕。")

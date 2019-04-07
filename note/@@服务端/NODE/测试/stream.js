/**
 * @Author nzq
 * @Date 2019/4/2
 * @Description: 写入
 * @Param:
 * @Return:
 */
function read() {
  let fs = require("fs");
  let data = '';

// 创建可读流
  let readerStream = fs.createReadStream('input');

// 设置编码为 utf8。
  readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
  readerStream.on('data', function(chunk) {
    // 换掉当前 chunk 中的所有“ ** ” 为 “## ”
    data += chunk.replace(/\*\*\s/g, function (data) {
      return "## ";
    });
  });

  readerStream.on('end',function(){
    console.log(data);
  });

  readerStream.on('error', function(err){
    console.log(err.stack);
  });

  console.log("程序执行完毕");
}
// read();

function write () {
  let fs = require("fs");
  let data = '菜鸟教程官网地址：www.runoob.com';

// 创建一个可以写入的流，写入到文件 output.txt 中
  let writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
  writerStream.write(data,'UTF8');

// 标记文件末尾
  writerStream.end();

// 处理流事件 --> data, end, and error
  writerStream.on('finish', function() {
    console.log("写入完成。");
  });

  writerStream.on('error', function(err){
    console.log(err.stack);
  });

  console.log("程序执行完毕");
}

// write();

function pipe () {
  let fs = require("fs");

// 创建一个可读流
  let readerStream = fs.createReadStream('input.txt');

// 创建一个可写流
  let writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
  readerStream.pipe(function (data) {
    console.log(data); // 报错 dest.on('unpipe', onunpipe);
  }).pipe(writerStream);

  console.log("程序执行完毕");
}
pipe();

function link () {
  let fs = require("fs");
  let zlib = require('zlib');

  // 压缩 input.txt 文件为 input.txt.gz
  fs.createReadStream('input.txt')
  .pipe(function (data, q, w, e, r) {
    console.log(data, q, w, e, r)
  })
  .pipe(fs.createWriteStream('input.txt.gz'));

  console.log("文件压缩完成。");
}
// link();

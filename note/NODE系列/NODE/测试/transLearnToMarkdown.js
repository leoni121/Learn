/**
 * @Author nzq
 * @Date 2019/4/3
 * @Description: 需求：将 Learn 文件下的文件转换为md格式，并且把其中的“** ” 换成 “## ”
 * @Param:
 * @Return:
 */
// https://blog.csdn.net/acoolgiser/article/details/84570057
/* https://www.jb51.net/article/52491.htm */

const fs = require('fs');
const join = require('path').join;

function readDir (path) {
  fs.readdir(path, function (err, files) {
    files.forEach(function (file) {
      let fPath = join(path, file);
      fs.stat(fPath, function (err, stats) {
        if (err) return;

        if (stats.isDirectory()) { // 目录

          readDir(fPath);
        } else if (stats.isFile()) { // 文件

          if (/(^(?!(.*\..*$)))|(.+\.txt$)/.test(file)) { // 匹配没有文件格式的 和 以 “.txt” 结尾的
            fileHandle(path, file);
          }
        }
      })
    })
  })
}

/**
 * @Author nzq
 * @Date 2019/4/3
 * @Description:
 * @Param:
 * @Return:
 */
function fileHandle(path, file) {
  reader(path, file, writer);
}
function reader (path, file, writerFun) {
  let idx = file.lastIndexOf(".txt");
  let writerPath = idx === -1 ? join(path, file+".md") : join(path, file.slice(0, idx) + ".md");
  let readerPath = join(path, file);
  let chunk='';

  let readerStream = fs.createReadStream(readerPath);
  readerStream.setEncoding('UTF8');

  readerStream.on('data', function(chunkData) {
    chunkData = chunkData.replace(/\*\*\s/gm, function ($1) {
      return "## "
    })
    chunkData = chunkData.replace(/\s(————|---|--)\s/gm, function ($1) {
      return "\n"
    })
    chunk += chunkData;
  });

  readerStream.on('end', function () {
    chunk = "[TOC]" + '\n' + chunk;
    writerFun(writerPath, readerPath, chunk)
  })

  readerStream.on('error', function (err) {
    console.error(err.stack);
  })
}

function writer(writerPath, readerPath, data) {
  let writerStream = fs.createWriteStream(writerPath);
  writerStream.write(data, 'UTF8');
  writerStream.end();

  // 处理流事件 --> data, end, and error
  writerStream.on('finish', function() {
    console.log(writerPath + ": 写入完成。");
    del(readerPath)
  });

  writerStream.on('error', function(err){
    console.log(err.stack);
  });
}

function del(readerPath) {
  fs.unlink(readerPath, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log(readerPath + ": 文件删除成功！");
  });
}

readDir('C:\\Users\\nzq\\Desktop\\面试');

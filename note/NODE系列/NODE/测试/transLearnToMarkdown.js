/**
 * @Author nzq
 * @Date 2019/4/3
 * @Description: 需求：
 *                      将 Learn 文件下的文件转换为md格式，并且把其中的“** ” 换成 “## ”
 * @Param:
 * @Return:
 */
// https://blog.csdn.net/acoolgiser/article/details/84570057
const fs = require('fs');
const path = require('path');

function readDir (path) {
  fs.readdir(path, function (err, files) {
    files.forEach(function (file) {
      let fPath = path.join(path, file);
      fs.stat(fPath, function (stats) {
        if (stats.isDirectory()) { // 目录
          if (/(\.txt)?/)
        } else if (stats.isFile()) { // 文件

        }
      })
    })
  })
}

function fileHandle(path) {

}
readDir('C:\\Users\\nzq\\Desktop\\面试');

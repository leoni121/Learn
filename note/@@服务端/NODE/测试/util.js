/**
 * @Author nzq
 * @Date 2019/4/2
 * @Description:
 * @Param:
 * @Return:
 */
var util = require('util');
function Person() {
  this.name = 'byvoid';
  this.toString = function() {
    return this.name;
  };
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, 2, 'red'));

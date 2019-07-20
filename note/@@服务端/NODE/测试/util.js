/**
 * @Author nzq
 * @Date 2019/4/2
 * @Description:
 * @Param:
 * @Return:
 */
var util = require('util');
function Base() {
  this.name = 'base';
  this.base = 1991;
  this.sayHello = function() {
    console.log('Hello ' + this.name);
  };
}
Base.prototype.showName = function() {
  console.log(this.name);
};
function Sub() {
  this.name = 'sub';
}
util.inherits(Sub, Base);
console.log(util.inspect(Sub, true, 4));

function Person() {
  this.name = 'byvoid';
  this.toString = function() {
    return this.name;
  };
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true));

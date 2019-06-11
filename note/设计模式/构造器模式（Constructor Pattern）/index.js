/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: 构造器模式
 *    构造器是一个当新建对象的内存被分配后，用来初始化该对象的一个特殊函数
 * @Param:
 * @Return:
 */

function Car( model, year, miles ) {

  this.model = model;
  this.year = year;
  this.miles = miles;

}

// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};


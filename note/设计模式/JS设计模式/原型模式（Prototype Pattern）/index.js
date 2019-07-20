/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: GoF将原型模式引用为通过克隆的方式基于一个现有对象的模板创建对象的模式
 *    我们能够将原型模式认作是基于原型的继承,我们创建作为其它对象原型的对象.原型对象自身被当做构造器创建的每一个对象的蓝图高效的使用着.如果构造器函数使用的原型包含例如叫做name的属性,那么每一个通过同一个构造器创建的对象都将拥有这个相同的属性.
 * @Param:
 * @Return:
 */

// Object.create 一般使用
var myCar = {

  name: "Ford Escort",

  drive: function () {
    console.log( "Weeee. I'm driving!" );
  },

  panic: function () {
    console.log( "Wait. How do you stop this thing?" );
  }

};
// Use Object.create to instantiate a new car
var yourCar = Object.create( myCar );
// Now we can see that one is a prototype of the other
console.log( yourCar.name );


// Object.create其他使用，后面添加的参数 在新的实例上面
var vehicle1 = {
  getModel: function () {
    console.log( "The model of this vehicle is.." + this.model );
  }
};
var car1 = Object.create(vehicle, {

  "id": {
    value: MY_GLOBAL.nextId(),
    // writable:false, configurable:false by default
    enumerable: true
  },

  "model": {
    value: "Ford",
    enumerable: true
  }

});


// 其他实现方式一
var vehiclePrototype = {

  init: function ( carModel ) {
    this.model = carModel;
  },

  getModel: function () {
    console.log( "The model of this vehicle is.." + this.model);
  }
};
function vehicle2( model ) {

  function F() {};
  F.prototype = vehiclePrototype;

  var f = new F();

  f.init( model );
  return f;

}
var car2 = vehicle2( "Ford Escort" );
car2.getModel();


// 其他实现方式二
var beget = (function () {

  function F() {}

  return function ( proto ) {
    F.prototype = proto;
    return new F();
  };
})();

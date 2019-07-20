/**
 * @Author nzq
 * @Date 2019/3/25
 * @Description: Mixin模式，就是一些提供能够被一个或者一组子类简单继承功能的类,意在重用其功能.
 *    Mixin支持在一个系统中降解功能的重复性,增加功能的重用性.在一些应用程序也许需要在所有的对象实体共享行为的地方,我们能够通过在一个Mixin中维护这个共享的功能,来很容易的避免任何重复,而因此专注于只实现我们系统中真正彼此不同的功能.
 *    对Mixin的副作用是值得商榷的.一些开发者感觉将功能注入到对象的原型中是一个坏点子,因为它会同时导致原型污染和一定程度上的对我们原有功能的不确定性.在大型的系统中,很可能是有这种情况的.
 * @Param:
 * @Return:
 */

// Define a simple Car constructor
var Car = function ( settings ) {

  this.model = settings.model || "no model provided";
  this.color = settings.color || "no colour provided";

};

// Mixin
var Mixin = function () {};

Mixin.prototype = {

  driveForward: function () {
    console.log( "drive forward" );
  },

  driveBackward: function () {
    console.log( "drive backward" );
  },

  driveSideways: function () {
    console.log( "drive sideways" );
  }

};

// Extend an existing object with a method from another
function augment( receivingClass, givingClass ) {

  // only provide certain methods
  if ( arguments[2] ) {
    for ( var i = 2, len = arguments.length; i < len; i++ ) {
      receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
    }
  }
  // provide all methods
  else {
    for ( var methodName in givingClass.prototype ) {

      // check to make sure the receiving class doesn't
      // have a method of the same name as the one currently
      // being processed
      if ( !Object.hasOwnProperty(receivingClass.prototype, methodName) ) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      }

      // Alternatively:
      // if ( !receivingClass.prototype[methodName] ) {
      //  receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      // }
    }
  }
}

// Augment the Car constructor to include "driveForward" and "driveBackward"
augment( Car, Mixin, "driveForward", "driveBackward" );

// Create a new Car
var myCar = new Car({
  model: "Ford Escort",
  color: "blue"
});

// Test to make sure we now have access to the methods
myCar.driveForward();
myCar.driveBackward();

// Outputs:
// drive forward
// drive backward

// We can also augment Car to include all functions from our mixin
// by not explicitly listing a selection of them
augment( Car, Mixin );

myCar.driveSideways();
// Outputs:
// drive sideways

// 这里知识断了Mixin和原来函数的联系，但是Car中没有断
Mixin.prototype.driveSideways = function () {
  console.log( "drive sideways change!" );
}

myCar.driveSideways();
// Outputs:
// drive sideways

/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: 工厂模式（Factory Pattern）
 *    工厂模式是另外一种关注对象创建概念的创建模式。它的领域中同其它模式的不同之处在于它并没有明确要求我们使用一个构造器。取而代之，一个工厂能提供一个创建对象的公共接口，我们可以在其中指定我们希望被创建的工厂对象的类型。
 *    试想一下，在我们被要求创建一种类型的UI组件时，我们就有一个UI工厂。并不是通过直接使用new操作符或者通过另外一个构造器来创建这个组件，我们取而代之的向一个工厂对象索要一个新的组件。我们告知工厂我们需要什么类型的组件（例如：“按钮”，“面板”），而它会将其初始化，然后返回供我们使用。如果创建过程相当复杂的话，那这会特别的有用，例如：如果它强烈依赖于动态因素或者应用程序配置的话。
 *    何时使用工厂模式，当被应用到下面的场景中时，工厂模式特别有用：
        当我们的对象或者组件设置涉及到高程度级别的复杂度时.
        当我们需要根据我们所在的环境方便的生成不同对象的实体时.
        当我们在许多共享同一个属性的许多小型对象或组件上工作时.
        当带有其它仅仅需要满足一种API约定(又名鸭式类型)的对象的组合对象工作时.这对于解耦来说是有用的.
 *    何时不要去使用工厂模式
        当被应用到错误的问题类型上时,这一模式会给应用程序引入大量不必要的复杂性.除非为创建对象提供一个接口是我们编写的库或者框架的一个设计上目标,否则我会建议使用明确的构造器,以避免不必要的开销.
        由于对象的创建过程被高效的抽象在一个接口后面的事实,这也会给依赖于这个过程可能会有多复杂的单元测试带来问题.
 * @Param:
 * @Return:
 */

// Types.js - Constructors used behind the scenes

// A constructor for defining new cars
function Car( options ) {

  // some defaults
  this.doors = options.doors || 4;
  this.state = options.state || "brand new";
  this.color = options.color || "silver";

}

// A constructor for defining new trucks
function Truck( options){

  this.state = options.state || "used";
  this.wheelSize = options.wheelSize || "large";
  this.color = options.color || "blue";
}


// FactoryExample.js

// Define a skeleton vehicle factory
function VehicleFactory() {}

// Define the prototypes and utilities for this factory

// Our default vehicleClass is Car
VehicleFactory.prototype.vehicleClass = Car;

// Our Factory method for creating new Vehicle instances
VehicleFactory.prototype.createVehicle = function ( options ) {

  if( options.vehicleType === "car" ){
    this.vehicleClass = Car;
  }else{
    this.vehicleClass = Truck;
  }

  return new this.vehicleClass( options );

};

// Create an instance of our factory that makes cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle( {
  vehicleType: "car",
  color: "yellow",
  doors: 6 } );

// Test to confirm our car was created using the vehicleClass/prototype Car

// Outputs: true
console.log( car instanceof Car );

// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log( car );

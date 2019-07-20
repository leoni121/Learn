/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: 抽象工厂（Abstract Factory）
 *   了解抽象工厂模式也是非常实用的,它的目标是以一个通用的目标将一组独立的工厂进行封装.它将一堆对象的实现细节从它们的一般用例中分离.抽象工厂应该被用在一种必须从其创建或生成对象的方式处独立,或者需要同多种类型的对象一起工作,这样的系统中.
 *   简单且容易理解的例子就是一个车辆,它定义了获取或者注册发动机类型的方式.抽象工厂会被命名为AbstractVehicleFactory.抽象工厂将允许像"car"或者"truck"的发动机类型的定义,并且构造工厂将仅实现满足发动机合同的类.(例如:Vehicle.prototype.driven和Vehicle.prototype.breakDown).
 *
 *  AbstractVehicleFactory（抽象工厂），里面添加（Car, Truck）的相当于不同的具体工厂，不同的具体工厂中有（drive, breakDown）。一个具体的工厂返回不同的（drive, breakDown）
 *
 *   在这里就是
 * @Param:
 * @Return:
 */

var AbstractVehicleFactory = (function () {

  // Storage for our vehicle types
  var types = {};

  return {
    getVehicle: function ( type, customizations ) {
      var Vehicle = types[type];

      return (Vehicle ? new Vehicle(customizations) : null);
    },

    registerVehicle: function ( type, Vehicle ) {
      var proto = Vehicle.prototype;

      // only register classes that fulfill the vehicle contract
      if ( proto.drive && proto.breakDown ) {
        types[type] = Vehicle;
      }

      return AbstractVehicleFactory;
    }
  };
})();


// Usage:

AbstractVehicleFactory.registerVehicle( "car", Car );
AbstractVehicleFactory.registerVehicle( "truck", Truck );

// Instantiate a new car based on the abstract vehicle type
var car = AbstractVehicleFactory.getVehicle( "car" , {
  color: "lime green",
  state: "like new" } );

// Instantiate a new truck in a similar manner
var truck = AbstractVehicleFactory.getVehicle( "truck" , {
  wheelSize: "medium",
  color: "neon yellow" } );

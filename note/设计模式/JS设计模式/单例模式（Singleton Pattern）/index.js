/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: (Singleton Pattern) 单例模式
 *    它限制一个类只能有一个实例化对象。经典的实现方式是，创建一个类，这个类包含一个方法，这个方法在没有对象存在的情况下，将会创建一个新的实例对象，如果对象存在，这个方法只是返回这个对象的引用。单例和静态类不同，因为我们可以推迟单例的初始化时间。
 * @Param:
 * @Return:
 */

var mySingleton = (function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init () {
      // 单例
      // 私有方法和变量
      function privateMethod () {
        console.log("I am private");
      }

      var privateVariable = "Im also private";

      var privateRandomNumber = Math.random();

      return {

        // 共有方法和变量
        publicMethod: function () {
          console.log("The public can see me!");
        },

        publicProperty: "I am also public",

        getRandomNumber: function () {
          return privateRandomNumber;
        }

      };

    }

    return {

      // 如果存在获取此单例实例，如果不存在创建一个单例实例
      getInstance: function () {

        if (!instance) {
          instance = init();
        }

        return instance;
      }

    };
})()


/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: 当一个对象需要和另外的对象进行跨系统协作的时候，单例模式很有用。下面是一个单例模式在这种情况下使用的例子
 * @Param:
 * @Return:
 */


var SingletonTester = (function () {

  // options: an object containing configuration options for the singleton
  // e.g var options = { name: "test", pointX: 5};
  function Singleton( options )  {

    // set options to the options supplied
    // or an empty object if none are provided
    options = options || {};

    // set some properties for our singleton
    this.name = "SingletonTester";

    this.pointX = options.pointX || 6;

    this.pointY = options.pointY || 10;

  }

  // our instance holder
  var instance;

  // an emulation of static variables and methods
  var _static  = {

    name:  "SingletonTester",

    // Method for getting an instance. It returns
    // a singleton instance of a singleton object
    getInstance:  function( options ) {
      if( instance  ===  undefined )  {
        instance = new Singleton( options );
      }

      return  instance;

    }
  };

  return  _static;

})();

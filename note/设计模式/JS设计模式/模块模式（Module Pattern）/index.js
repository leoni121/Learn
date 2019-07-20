/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: 在JavaScript中，有几种实现模块的选项。这些包括：模块模式,对象文字符号,AMD模块,CommonJS模块,ECMAScript Harmony模块
 * @Param:
 * @Return:
 */


/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: 对象字面量
 *    使用对象文字可以帮助封装和组织代码
 * @Param:
 * @Return:
 */

var myModule = {

  myProperty: "someValue",

  // object literals can contain properties and methods.
  // e.g we can define a further object for module configuration:
  myConfig: {
    useCaching: true,
    language: "en"
  },

  // a very basic method
  saySomething: function () {
    console.log( "Where in the world is Paul Irish today?" );
  },

  // output a value based on the current configuration
  reportMyConfig: function () {
    console.log( "Caching is: " + ( this.myConfig.useCaching ? "enabled" : "disabled") );
  },

  // override the current configuration
  updateMyConfig: function( newConfig ) {
    if ( typeof newConfig === "object" ) {
      this.myConfig = newConfig;
      console.log( this.myConfig.language );
    }
  }
};



/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: 模块模式（Module）
 *    最初被定义为为传统软件工程中的类提供私有和公共封装的方法,在JavaScript中，Module模式用于进一步模拟类的概念，使得我们能够在单个对象中包含公共/私有方法和变量，从而将特定部分与全局范围隔离开来。这导致我们的函数名称与页面上其他脚本中定义的其他函数冲突的可能性降低。
 *    使用这种模式实现的购物车。这个模块完全自包含在一个叫做basketModule 全局变量中。模块中的购物车数组是私有的，应用的其它部分不能直接读取。只存在与模块的闭包中，因此只有可以访问其域的方法可以访问这个变量。
 * @Param:
 * @Return:
 */

var basketModule = (function () {

  // privates
  var basket = [];

  function doSomethingPrivate() {
    //...
  }

  function doSomethingElsePrivate() {
    //...
  }

  // Return an object exposed to the public
  return {

    // Add items to our basket
    addItem: function( values ) {
      basket.push(values);
    },

    // Get the count of items in the basket
    getItemCount: function () {
      return basket.length;
    },

    // Public alias to a  private function
    doSomething: doSomethingPrivate,

    // Get the total value of items in the basket
    getTotal: function () {

      var q = this.getItemCount(),
        p = 0;

      while (q--) {
        p += basket[q].price;
      }

      return p;
    }
  };
}());


/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description:  Import mixins(导入混合)
 *    这个变体展示了如何将全局（例如 jQuery, Underscore）作为一个参数传入模块的匿名函数。这种方式允许我们导入全局，并且按照我们的想法在本地为这些全局起一个别名。
 * @Param:
 * @Return:
 */

var myModule = (function ( jQ, _ ) {

  function privateMethod1(){
    jQ(".container").html("test");
  }

  function privateMethod2(){
    console.log( _.min([10, 5, 100, 2, 1000]) );
  }

  return{
    publicMethod: function(){
      privateMethod1();
    }
  };

// Pull in jQuery and Underscore
}( jQuery, _ ));


/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description:  Exports（导出）
 *    这个变体允许我们声明全局对象而不用使用它们，同样也支持在下一个例子中我们将会看到的全局导入的概念。
 * @Param:
 * @Return:
 */

// Global module
var myModule = (function () {

  // Module object
  var module = {},
    privateVariable = "Hello World";

  function privateMethod() {
    // ...
  }

  module.publicProperty = "Foobar";
  module.publicMethod = function () {
    console.log( privateVariable );
  };

  return module;

}());

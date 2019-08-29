/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: 命令模式（Command Pattern）
 *    命名模式的目标是将方法的调用,请求或者操作封装到一个单独的对象中,同时给我们 参数化和传递方法调用的能力
 *    命令模式背后的一般理念是为我们提供了从任何执行中的命令中分离出发出命令的责任,取而代之将这一责任委托给其它的对象.实现明智简单的命令对象,将一个行为和对象对调用这个行为的需求都绑定到了一起.它们始终都包含一个执行操作(比如run()或者execute()).所有带有相同接口的命令对象能够被简单地根据需要调换,这被认为是命令模式的更大的好处之一.
 * @Param:
 * @Return:
 */

var CarManager = {

  // request information
  requestInfo: function( model, id ){
    return "The information for " + model + " with ID " + id + " is foobar";
  },

  // purchase the car
  buyVehicle: function( model, id ){
    return "You have successfully purchased Item " + id + ", a " + model;
  },

  // arrange a viewing
  arrangeViewing: function( model, id ){
    return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
  }

};

CarManager.execute = function ( name ) {
  return CarManager[name] && CarManager[name].apply( CarManager, [].slice.call(arguments, 1) );
};

CarManager.execute( "arrangeViewing", "Ferrari", "14523" );
CarManager.execute( "requestInfo", "Ford Mondeo", "54323" );
CarManager.execute( "requestInfo", "Ford Escort", "34232" );
CarManager.execute( "buyVehicle", "Ford Escort", "34232" );

/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: (Mediator Pattern) 中介者模式
 *    中介者是一个行为设计模式，使我们可以导出统一的接口，这样系统不同部分就可以彼此通信
 *    如果系统组件之间存在大量的直接关系，就可能是时候，使用一个中心的控制点，来让不同的组件通过它来通信。中介者通过将组件之间显式的直接的引用替换成通过中心点来交互的方式，来做到松耦合。这样可以帮助我们解耦，和改善组件的重用性。
 *    从实现角度来讲，中介者模式是观察者模式中的共享被观察者对象。在这个系统中的对象之间直接的发布/订阅关系被牺牲掉了，取而代之的是维护一个通信的中心节点。
 *    也可以认为是一种补充-用于应用级别的通知，例如不同子系统之间的通信，子系统本身很复杂，可能需要使用发布/订阅模式来做内部组件之间的解耦。
 *    另外一个类似的例子是DOM的事件冒泡机制，以及事件代理机制。如果系统中所有的订阅者都是对文档订阅，而不是对独立的节点订阅，那么文档就充当一个中介者的角色。DOM的这种做法，不是将事件绑定到独立节点上，而是用一个更高级别的对象负责通知订阅者关于交互事件的信息。
 *
 *
 * @Param:
 * @Return:
 */

// 基础的实现
// 中介者模式的一种简单的实现可以在下面找到,publish()和subscribe()方法都被暴露出来使用
var mediator = (function(){

  // Storage for topics that can be broadcast or listened to
  var topics = {};

  // Subscribe to a topic, supply a callback to be executed
  // when that topic is broadcast to
  var subscribe = function( topic, fn ){

    if ( !topics[topic] ){
      topics[topic] = [];
    }

    topics[topic].push( { context: this, callback: fn } );

    return this;
  };

  // Publish/broadcast an event to the rest of the application
  var publish = function( topic ){

    var args;

    if ( !topics[topic] ){
      return false;
    }

    args = Array.prototype.slice.call( arguments, 1 );
    for ( var i = 0, l = topics[topic].length; i < l; i++ ) {

      var subscription = topics[topic][i];
      subscription.callback.apply( subscription.context, args );
    }
    return this;
  };

  return {
    publish: publish,
    subscribe: subscribe,

    // 类似先前 观察者模式 当中的 extend函数，都是对一个Object进行扩展
    installTo: function( obj ){
      obj.subscribe = subscribe;
      obj.publish = publish;
    }
  };

}());

// 高级实现，（可参考）http://thejacklawson.com/Mediator.js/mediator.html#section-16
// 下面来源自 《JavaScript设计模式》





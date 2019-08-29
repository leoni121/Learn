/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: 观察者模式要求想要接受相关通知的观察者必须到发起这个事件的被观察者上注册这个事件。
 *                发布/订阅模式使用一个主题/事件频道，这个频道处于想要获取通知的订阅者和发起事件的发布者之间。这个事件系统允许代码定义应用相关的事件，这个事件可以传递特殊的参数，参数中包含有订阅者所需要的值。这种想法是为了避免订阅者和发布者之间的依赖性。
 * @Param:
 * @Return:
 */

/*
* topic
*   {
*     "事件": [{ token:'', func: function }, { token:'', func: function }, { token:'', func: function }],
*     "事件": [{ token:'', func: function }, { token:'', func: function }, { token:'', func: function }],
*   }
*
*/

var pubsub = {};

(function(q) {

  var topics = {},
    subUid = -1;

  // Publish or broadcast events of interest
  // with a specific topic name and arguments
  // such as the data to pass along
  q.publish = function( topic, args ) {

    if ( !topics[topic] ) {
      return false;
    }

    var subscribers = topics[topic],
      len = subscribers ? subscribers.length : 0;

    while (len--) {
      subscribers[len].func( topic, args );
    }

    return this;
  };

  // Subscribe to events of interest
  // with a specific topic name and a
  // callback function, to be executed
  // when the topic/event is observed
  q.subscribe = function( topic, func ) {

    if (!topics[topic]) {
      topics[topic] = [];
    }

    var token = ( ++subUid ).toString();
    topics[topic].push({
      token: token,
      func: func
    });
    return token;
  };

  // Unsubscribe from a specific
  // topic, based on a tokenized reference
  // to the subscription
  q.unsubscribe = function( token ) {
    for ( var m in topics ) {
      if ( topics[m] ) {
        for ( var i = 0, j = topics[m].length; i < j; i++ ) {
          if ( topics[m][i].token === token) {
            topics[m].splice( i, 1 );
            return token;
          }
        }
      }
    }
    return this;
  };
}( pubsub ));

// Another simple message handler

// A simple message logger that logs any topics and data received through our
// subscriber
var messageLogger = function ( topics, data ) {
  console.log( "Logging: " + topics + ": " + data );
};

// Subscribers listen for topics they have subscribed to and
// invoke a callback function (e.g messageLogger) once a new
// notification is broadcast on that topic
var subscription = pubsub.subscribe( "inbox/newMessage", messageLogger );

// Publishers are in charge of publishing topics or notifications of
// interest to the application. e.g:

pubsub.publish( "inbox/newMessage", "hello world!" );

// or
pubsub.publish( "inbox/newMessage", ["test", "a", "b", "c"] );

// or
pubsub.publish( "inbox/newMessage", {
  sender: "hello@google.com",
  body: "Hey again!"
});

// We cab also unsubscribe if we no longer wish for our subscribers
// to be notified
pubsub.unsubscribe( subscription );

// Once unsubscribed, this for example won't result in our
// messageLogger being executed as the subscriber is
// no longer listening
pubsub.publish( "inbox/newMessage", "Hello! are you still there?" );



// Return the current local time to be used in our UI later
getCurrentTime = function (){

  var date = new Date(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    y = date.getFullYear(),
    t = date.toLocaleTimeString().toLowerCase();

  return (m + "/" + d + "/" + y + " " + t);
};

// Add a new row of data to our fictional grid component
function addGridRow( data ) {

  // ui.grid.addRow( data );
  console.log( "updated grid component with:" + data );

}

// Update our fictional grid to show the time it was last
// updated
function updateCounter( data ) {

  // ui.grid.updateLastChanged( getCurrentTime() );
  console.log( "data last updated at: " + getCurrentTime() + " with " + data);

}

// Update the grid using the data passed to our subscribers
gridUpdate = function( topic, data ){

  if ( data !== "undefined" ) {
    addGridRow( data );
    updateCounter( data );
  }

};

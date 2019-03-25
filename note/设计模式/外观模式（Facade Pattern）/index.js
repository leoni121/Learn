/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: 外观模式（Facade）
 *    当我们提出一个外观，我们要向这个世界展现的是一个外观，这一外观可能藏匿着一种非常与众不同的真实。这就是我们即将要回顾的模式背后的灵感——外观模式。这一模式提供了面向一种更大型的代码体提供了一个的更高级别的舒适的接口，隐藏了其真正的潜在复杂性。把这一模式想象成要是呈现给开发者简化的API，一些总是会提升使用性能的东西。
 *    外观是一种经常可以在Javascript库中看到的结构性模式，像在jQuery中，尽管一种实现可能支持带有广泛行为的方法，但仅仅只有这些方法的“外观”或者说被限制住的抽象才会公开展现出来供人们所使用。
 * @Param:
 * @Return:
 */

// 使用了一个门面来简化跨浏览器事件监听的接口。我们创建了一个公共的方法来实现，此方法 能够被用在检查特性的存在的代码中，以便这段代码能够提供一种安全和跨浏览器兼容方案。

var addMyEvent = function( el,ev,fn ){

  if( el.addEventListener ){
    el.addEventListener( ev,fn, false );
  }else if(el.attachEvent){
    el.attachEvent( "on" + ev, fn );
  } else{
    el["on" + ev] = fn;
  }

};


// jQuery的$(document).ready(..)，使 用了一种类似的方式。在内部，这实际上是考一个叫做bindReady()的方法来驱动的，它做了一些这样的事：

/*bindReady: function() {
...
  if ( document.addEventListener ) {
    // Use the handy event callback
    document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

    // A fallback to window.onload, that will always work
    window.addEventListener( "load", jQuery.ready, false );

    // If IE event model is used
  } else if ( document.attachEvent ) {

    document.attachEvent( "onreadystatechange", DOMContentLoaded );

    // A fallback to window.onload, that will always work
    window.attachEvent( "onload", jQuery.ready );
  ...*/

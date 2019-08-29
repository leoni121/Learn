/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: (Observer Pattern) 观察者模式
 *    观察者模式是这样一种设计模式。一个被称作被观察者的对象（Subject）维护一组被称为观察者的对象(Observer)，这些对象依赖于被观察者，被观察者自动将自身的状态的任何变化通知给它们。当一个被观察者需要将一些变化通知给观察者的时候，它将采用广播的方式，这条广播可能包含特定于这条通知的一些数据。当特定的观察者不再需要接受来自于它所注册的被观察者的通知的时候，被观察者可以将其从所维护的组中删除。
 *    被观察者(Subject)：维护一组观察者， 提供用于增加和移除观察者的方法。
 *    观察者(Observer)：提供一个更新接口，用于当被观察者状态变化时，得到通知。
 *    具体的被观察者(ConcreteSubject)：状态变化时广播通知给观察者，保持具体的观察者的信息。
 *    具体的观察者(ConcreteObserver)：保持一个指向具体被观察者的引用，实现一个更新接口，用于观察，以便保证自身状态总是和被观察者状态一致的。
 * @Param:
 * @Return:
 */


/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: Extend an object with an extension
 * @Param: extension 用于扩展 obj
 * @Param: obj 被扩展的对象
 * @Return:
 */
function extend( extension, obj ){
  for ( var key in extension ){
    obj[key] = extension[key];
  }
}

// 观察者列表
function ObserverList(){
  this.observerList = [];
}

ObserverList.prototype.Add = function( obj ){
  return this.observerList.push( obj );
};

ObserverList.prototype.Empty = function(){
  this.observerList = [];
};

ObserverList.prototype.Count = function(){
  return this.observerList.length;
};

ObserverList.prototype.Get = function( index ){
  if( index > -1 && index < this.observerList.length ){
    return this.observerList[ index ];
  }
};

ObserverList.prototype.Insert = function( obj, index ){
  var pointer = -1;

  if( index === 0 ){
    this.observerList.unshift( obj );
    pointer = index;
  }else if( index === this.observerList.length ){
    this.observerList.push( obj );
    pointer = index;
  }

  return pointer;
};

ObserverList.prototype.IndexOf = function( obj, startIndex ){
  var i = startIndex, pointer = -1;

  while( i < this.observerList.length ){
    if( this.observerList[i] === obj ){
      pointer = i;
    }
    i++;
  }

  return pointer;
};

ObserverList.prototype.RemoveAt = function( index ){
  if( index === 0 ){
    this.observerList.shift();
  }else if( index === this.observerList.length -1 ){
    this.observerList.pop();
  }
};


// The Subject, 内部实例化ObserverList
function Subject(){
  this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function( observer ){
  this.observers.Add( observer );
};

Subject.prototype.RemoveObserver = function( observer ){
  this.observers.RemoveAt( this.observers.IndexOf( observer, 0 ) );
};

Subject.prototype.Notify = function( context ){
  var observerCount = this.observers.Count();
  for(var i=0; i < observerCount; i++){
    this.observers.Get(i).Update( context );
  }
};

// The Observer
function Observer(){
  this.Update = function(context){
    // ...
  };
}



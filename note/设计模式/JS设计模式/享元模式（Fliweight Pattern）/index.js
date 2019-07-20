/**
 * @Author nzq
 * @Date 2019/3/25
 * @Description:
 *  实现享元模式的一般步骤：

 1、将所有外在数据从目标类中剥离。具体做法是尽可能多的删除该类的属性，所删除的应该是那种因实例而异的属性。构造函数的参数也要这样处理，这些参数应该被添加到该类的各个方法。

 这些外在数据不在保存在该类的内部，而是由管理器提供给类的方法。经过这样的处理，目标类应该具有与之前一样的功能，唯一的区别在于数据的来源发生了变化。

 2、创建一个用来控制该类的实例化工厂。

 具体做法：一是用一个对象来保存每一个这类对象的引用，每次要求工厂提供一个对象时，它会先检查那个对象中是否以前有请求，请求过该对象，如果有，那么直接返回；如果没有，直接创建并

 保存到那个类对象中，然后返回这个对象。

 另外一种做法，就是对象池，这种技术是用数组来保存所创建的对象的引用。它适合于注重对象的数量而不是那些单独配置的实例的场合。

 3、创建一个用来保存外在数据的管理器。该管理对象负责控制处理外在数据的种种事宜；在实例化之前，要是一个目标类的实例，你会把所有数据传给构造函数以创建新实例。

 而现在要是需要一个实例，就会调用管理器的某个方法，把所有数据提供给它，这个方法会分辨内在数据和外在数据。它把内在数据提供给工厂对象以创建一个对象（或者，如果已经存在这样一个对象

 ，重复利用），外在数据则被保存在管理器内的一个数据结构中。
 享元模式只不过是一种优化模式，一定要慎重使用，如果使用这样的模式，你必须是在运行效率和可维护性上做取舍；
 优势：可以把网页资源符合降低几个数量级。
 缺点：使用该模式，如果出错，可能存在三个地方：管理器、工厂、享元；给维护带来难度。
 * @Param:
 * @Return:
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var Book = function( id, title, author, genre, pageCount,publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate,availability ){
  // ...
};

Book.prototype = {
  // ...
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Flyweight optimized version
var Book = function ( title, author, genre, pageCount, publisherID, ISBN ) {
  // ...
};
var BookFactory = (function () {
  var existingBooks = {}, existingBook;

  return {
    createBook: function ( title, author, genre, pageCount, publisherID, ISBN ) {

      // Find out if a particular book meta-data combination has been created before
      // !! or (bang bang) forces a boolean to be returned
      existingBook = existingBooks[ISBN];
      if ( !!existingBook ) {
        return existingBook;
      } else {

        // if not, let's create a new instance of the book and store it
        var book = new Book( title, author, genre, pageCount, publisherID, ISBN );
        existingBooks[ISBN] = book;
        return book;

      }
    }
  };
});
// 数据方面
// BookRecordManager singleton
var BookRecordManager = (function () {

  var bookRecordDatabase = {};

  return {
    // add a new book into the library system
    addBookRecord: function ( id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability ) {

      var book = BookFactory.createBook( title, author, genre, pageCount, publisherID, ISBN );

      bookRecordDatabase[id] = {
        checkoutMember: checkoutMember,
        checkoutDate: checkoutDate,
        dueReturnDate: dueReturnDate,
        availability: availability,
        book: book
      };
    },

    updateCheckoutStatus: function ( bookID, newStatus, checkoutDate, checkoutMember, newReturnDate ) {

      var record = bookRecordDatabase[bookID];
      record.availability = newStatus;
      record.checkoutDate = checkoutDate;
      record.checkoutMember = checkoutMember;
      record.dueReturnDate = newReturnDate;
    },

    extendCheckoutPeriod: function ( bookID, newReturnDate ) {
      bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
    },

    isPastDue: function ( bookID ) {
      var currentDate = new Date();
      return currentDate.getTime() > Date.parse( bookRecordDatabase[bookID].dueReturnDate );
    }
  };

});

// DOM
var stateManager = {

  fly: function () {

    var self = this;

    $( "#container" ).unbind().on( "click" , function ( e ) {
      var target = $( e.originalTarget || e.srcElement );
      if ( target.is( "div.toggle") ) {
        self.handleClick( target );
      }
    });
  },

  handleClick: function ( elem ) {
    elem.find( "span" ).toggle( "slow" );
  }
};


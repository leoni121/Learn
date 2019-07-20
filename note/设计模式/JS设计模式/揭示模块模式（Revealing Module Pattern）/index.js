/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: （Revealing Module Pattern）揭示模块模式
 *    揭示模块模式来自于，当Heilmann对这样一个现状的不满，即当我们想要在一个公有方法中调用另外一个公有方法，或者访问公有变量的时候，我们不得不重复主对象的名称。他也不喜欢模块模式中，当想要将某个成员变成公共成员时，使用对象字面量表示的做法。
 *    因此他工作的结果就是一个更新的模式，在这个模式中，我们可以简单地在私有域中定义我们所有的函数和变量，并且返回一个匿名对象，这个对象包含有一些指针，这些指针指向我们想要暴露出来的私有成员，使这些私有成员公有化。
 *    优点：这个模式是我们脚本的语法更加一致。同样在模块的最后关于那些函数和变量可以被公共访问也变得更加清晰，增强了可读性。
 * @Param:
 * @Return:
 */

var myRevealingModule = function () {

  var privateVar = "Ben Cherry",
    publicVar  = "Hey there!";

  function privateFunction() {
    console.log( "Name:" + privateVar );
  }

  function publicSetName( strName ) {
    privateVar = strName;
  }

  function publicGetName() {
    privateFunction();
  }


  // Reveal public pointers to
  // private functions and properties

  return {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName
  };

}();

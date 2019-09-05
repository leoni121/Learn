/**
 * @Author nzq
 * @Date 2019/3/25
 * @Description: 装饰者模式（Decorator Pattern）
 *    装饰器是旨在提升重用性能的一种结构性设计模式。同Mixin类似，它可以被看作是应用子类划分的另外一种有价值的可选方案。典型的装饰器提供了向一个系统中现有的类动态添加行为的能力。其创意是装饰本身并不关心类的基础功能，而只是将它自身拷贝到超类之中。
 *    装饰器模式并不去深入依赖于对象是如何创建的，而是专注于扩展它们的功能这一问题上。不同于只依赖于原型继承，我们在一个简单的基础对象上面逐步添加能够提供附加功能的装饰对象。它的想法是，不同于子类划分，我们向一个基础对象添加（装饰）属性或者方法，因此它会是更加轻巧的。
 *    由于装饰器能够动态的修改对象，它们就是改变现有系统的理想模式。有时候，它只是简单的围绕一个对象及其维护针对每一个对象类型单独的子类划分所产生的麻烦，来创建装饰器的。这使得维护起可能需要大量子类划分对象的应用程序来更加显著的直接。
 *
 *    优点 & 缺点
      因为它可以被透明的使用，并且也相当的灵活，因此开发者都挺乐意去使用这个模式——如我们所见，对象可以用新的行为封装或者“装饰”起来，而后继续使用，并不用去担心基础的对象被改变。在一个更加广泛的范围内，这一模式也避免了我们去依赖大量子类来实现同样的效果。然而在实现这个模式时，也存在我们应该意识到的缺点。如果穷于管理，它也会由于引入了许多微小但是相似的对象到我们的命名空间中，从而显著的使得我们的应用程序架构变得复杂起来。这里所担忧的是，除了渐渐变得难于管理，其他不能熟练使用这个模式的开发者也可能会有一段要掌握它被使用的理由的艰难时期。够的注释或者对模式的研究，对此应该有助益，而只要我们对在我们的应程序中的多大范围内使用这一模式有所掌控的话，我们就能让两方面都得到改善。
 * @Param:
 * @Return:
 */

// The constructor to decorate
function MacBook() {

  this.cost = function () { return 997; };
  this.screenSize = function () { return 11.6; };

}

// Decorator 1
function Memory( macbook ) {

  var v = macbook.cost();
  macbook.cost = function() {
    return v + 75;
  };

}

// Decorator 2
function Engraving( macbook ){

  var v = macbook.cost();
  macbook.cost = function(){
    return  v + 200;
  };

}

// Decorator 3
function Insurance( macbook ){
  var v = macbook.cost();
  macbook.cost = function(){
    return  v + 250;
  };
}

var mb = new MacBook();
Memory( mb );
Engraving( mb );
Insurance( mb );

// Outputs: 1522
console.log( mb.cost() );

// Outputs: 11.6
console.log( mb.screenSize() );

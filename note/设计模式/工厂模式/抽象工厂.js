/**
 * @Author nzq
 * @Date 2019/3/24
 * @Description: 抽象工厂（Abstract Factory）
 *   了解抽象工厂模式也是非常实用的,它的目标是以一个通用的目标将一组独立的工厂进行封装.它将一堆对象的实现细节从它们的一般用例中分离.抽象工厂应该被用在一种必须从其创建或生成对象的方式处独立,或者需要同多种类型的对象一起工作,这样的系统中.
 *   简单且容易理解的例子就是一个发动机工厂,它定义了获取或者注册发动机类型的方式.抽象工厂会被命名为AbstractVehicleFactory.抽象工厂将允许像"car"或者"truck"的发动机类型的定义,并且构造工厂将仅实现满足发动机合同的类.(例如:Vehicle.prototype.driven和Vehicle.prototype.breakDown).
 * @Param:
 * @Return:
 */

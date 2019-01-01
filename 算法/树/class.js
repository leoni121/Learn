class Foo {
    constructor(who){
        this.me = who;
    }

    identify(){
        return "I am " + this.me;
    }
}


class Bar extends Foo {
    constructor(who){
        // super() 指的是调用父类
        // 调用的同时，会绑定 this 。
        // 如：Foo.call(this, who)
        super(who);
    }

    speak(){
        console.log(this.speak);
        console.log( "Hello, " + this.identify() + "." );
    }
}

var b1 = new Bar( "b1" );

b1.speak();
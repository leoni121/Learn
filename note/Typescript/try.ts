interface Person {
    firstName: string;
    lastName: string;
}

class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName ){
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

function greeter(person: Person) {
    console.log(`Hello ${person.firstName}-${person.lastName}`);
}
let user: Person = new Student("Jane", "M.", "Userdsdsd");

console.log(user);
greeter(user);

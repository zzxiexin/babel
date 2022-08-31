class Person {
    constructor (name, age){
        this.name = name;
        this.age = age;
    }
    say (){
        console.log(`my name is ${this.name} age is ${this.age}`)
    }
    run (){
        console.log(`${this.name} can run`)
    }
}

class Xinxin extends Person {
    constructor (name, age, sex){
        super(name, age)
        this.sex = sex;
    }
    getInfo (){
        console.log(`my name is ${this.name}, and my age is ${this.age}, sex is ${this.sex}`)
    }
}
var person = new Xinxin('xinxin', 20, 'man');
person.say();
person.getInfo();
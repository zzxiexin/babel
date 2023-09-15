interface personType {
    name: string;
    age: number;
}

class Person1 implements personType {
    name = ''
    age = 0
    constructor (name: string, age: number){
        this.name = name;
        this.age = age;
    }
}
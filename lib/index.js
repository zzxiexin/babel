class Person {
    name = ''
    constructor (name){
        this.name = name
    }
    say (){
        console.log(`${this.name} can say hello`)
    }
    get name (){
        return this.name
    }
}
const object = {
    a: 1,
    b: 2
}
let {a: c, b: d} = object;
c = 9, d = 10;
console.log(c, d); 
console.log(object); 
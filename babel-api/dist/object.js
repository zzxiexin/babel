"use strict";

var object = {
  a: 1,
  b: 2
};
var c = object.a,
    d = object.b;
c = 9, d = 10;
console.log(c, d);
console.log(object);
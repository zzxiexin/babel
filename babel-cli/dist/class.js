"use strict";

require("core-js/modules/es.error.cause.js");

require("core-js/modules/es.error.to-string.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.define-property.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Person = /*#__PURE__*/function () {
  function Person(name, age) {
    _classCallCheck(this, Person);

    this.name = name;
    this.age = age;
  }

  _createClass(Person, [{
    key: "say",
    value: function say() {
      console.log("my name is ".concat(this.name, " age is ").concat(this.age));
    }
  }, {
    key: "run",
    value: function run() {
      console.log("".concat(this.name, " can run"));
    }
  }]);

  return Person;
}(); // class Xinxin extends Person {
//     constructor (name, age, sex){
//         super(name, age)
//         this.sex = sex;
//     }
//     getInfo (){
//         console.log(`my name is ${this.name}, and my age is ${this.age}, sex is ${this.sex}`)
//     }
// }
// var person = new Xinxin('xinxin', 20, 'man');
// person.say();
// person.getInfo();
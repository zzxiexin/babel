"use strict";

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Person = /*#__PURE__*/function () {
  function Person(name, age) {
    (0, _classCallCheck2["default"])(this, Person);
    this.name = name;
    this.age = age;
  }
  (0, _createClass2["default"])(Person, [{
    key: "say",
    value: function say() {
      var _context;
      console.log((0, _concat["default"])(_context = "my name is ".concat(this.name, " age is ")).call(_context, this.age));
    }
  }, {
    key: "run",
    value: function run() {
      console.log("".concat(this.name, " can run"));
    }
  }]);
  return Person;
}();
var Xinxin = /*#__PURE__*/function (_Person) {
  (0, _inherits2["default"])(Xinxin, _Person);
  var _super = _createSuper(Xinxin);
  function Xinxin(name, age, sex) {
    var _this;
    (0, _classCallCheck2["default"])(this, Xinxin);
    _this = _super.call(this, name, age);
    _this.sex = sex;
    return _this;
  }
  (0, _createClass2["default"])(Xinxin, [{
    key: "getInfo",
    value: function getInfo() {
      var _context2, _context3;
      console.log((0, _concat["default"])(_context2 = (0, _concat["default"])(_context3 = "my name is ".concat(this.name, ", and my age is ")).call(_context3, this.age, ", sex is ")).call(_context2, this.sex));
    }
  }]);
  return Xinxin;
}(Person);
var person = new Xinxin('xinxin', 20, 'man');
person.say();
person.getInfo();
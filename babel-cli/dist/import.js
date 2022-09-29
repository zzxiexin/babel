"use strict";

var _cjs = _interopRequireDefault(require("./cjs"));

var _esm = _interopRequireDefault(require("./esm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import和require混用模式
// 1、require引入cjs
var cjs = require("./cjs"); // 2、require =>  export default


var cjs1 = require("./esm"); // 3、import导入module.exports模块


console.log(cjs);
console.log(cjs1);
console.log(_cjs["default"]);
console.log(_esm["default"]);
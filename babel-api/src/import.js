// import和require混用模式
// 1、require引入cjs
var cjs = require('./cjs');
// 2、require =>  export default
var cjs1 = require('./esm');
// 3、import导入module.exports模块
import cjs2 from './cjs';
// 4、import导入esm模块
import cjs3 from './esm';
console.log(cjs);
console.log(cjs1);
console.log(cjs2);
console.log(cjs3);

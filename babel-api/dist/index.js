"use strict";

require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.regexp.test.js");
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.error.to-string.js");
require("core-js/modules/es.array.last-index-of.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var babel = require('@babel/core');
var fs = require('fs');
var path = require('path');
var dirName = path.resolve('./src');
var babelConfig = require('../babel.config');
// 判断是不是文件夹
var judgeIsDirectory = function judgeIsDirectory(fileNameStr) {
  return fs.lstatSync(fileNameStr).isDirectory();
};

// 如果没有文件夹就新建文件夹
var writeFileRecursive = function writeFileRecursive(path, buffer, callback) {
  var lastPath = path.substring(0, path.lastIndexOf('/'));
  fs.mkdir(lastPath, {
    recursive: true
  }, function (err) {
    if (err) return callback(err);
    fs.writeFile(path, buffer, function (err) {
      if (err) return callback(err);
      return callback(null);
    });
  });
};
// 获取所有的file的绝对路径list
var getAllFiles = function getAllFiles(fileOrDir) {
  var result = [];
  if (judgeIsDirectory(fileOrDir)) {
    var files = fs.readdirSync(fileOrDir);
    files.forEach(function (file) {
      if (judgeIsDirectory(path.resolve(fileOrDir, file))) {
        result = [].concat(_toConsumableArray(result), _toConsumableArray(getAllFiles(path.resolve(fileOrDir, file))));
      } else {
        result.push(path.resolve(fileOrDir, file));
      }
    });
  } else {
    result.push(path.resolve(fileOrDir));
  }
  return result;
};
// babel编译代码并写入到新的文件中
var allChangeFiles = getAllFiles(dirName);
allChangeFiles.forEach(function (file) {
  var changedCode = babel.transformFileSync(file, babelConfig);
  writeFileRecursive("".concat(file.replace('src', 'dist')), changedCode.code, function (err) {
    if (err) console.error(err);
    console.info('write success');
  });
});
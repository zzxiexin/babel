"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var babel = require('@babel/core');
var fs = require('fs');
var path = require('path');
var dirName = path.resolve('./src');
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
        result = [].concat((0, _toConsumableArray2["default"])(result), (0, _toConsumableArray2["default"])(getAllFiles(path.resolve(fileOrDir, file))));
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
  var changedCode = babel.transformFileSync(file, {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-transform-runtime']
  });
  writeFileRecursive("".concat(file.replace('src', 'dist')), changedCode.code, function (err) {
    if (err) console.error(err);
    console.info('write success');
  });
});
const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');
const dirName = path.resolve('./lib');
const babelConfig = require('./babel.config.json')
// 判断是不是文件夹
const judgeIsDirectory = (fileNameStr) => {
  return fs.lstatSync(fileNameStr).isDirectory();
};

// 如果没有文件夹就新建文件夹
const writeFileRecursive = function (path, buffer, callback) {
  let lastPath = path.substring(0, path.lastIndexOf('/'));
  fs.mkdir(lastPath, { recursive: true }, (err) => {
    if (err) return callback(err);
    fs.writeFile(path, buffer, function (err) {
      if (err) return callback(err);
      return callback(null);
    });
  });
};
// 获取所有的file的绝对路径list
const getAllFiles = (fileOrDir) => {
  let result = [];
  if (judgeIsDirectory(fileOrDir)) {
    const files = fs.readdirSync(fileOrDir);
    files.forEach((file) => {
      if (judgeIsDirectory(path.resolve(fileOrDir, file))) {
        result = [...result, ...getAllFiles(path.resolve(fileOrDir, file))];
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
const allChangeFiles = getAllFiles(dirName);
allChangeFiles.forEach((file) => {
  const changedCode = babel.transformFileSync(file, babelConfig);
  writeFileRecursive(
    `${file.replace('lib', 'dist')}`,
    changedCode.code,
    (err) => {
      if (err) console.error(err);
      console.info('write success');
    }
  );
});
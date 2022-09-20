const babel = require("@babel/core");
const fs = require("fs");
fs.readFile("./source_code.js", "utf8", function (err, datastr) {
  console.log("读取成功后的" + err);
  console.log("读取成功后的" + datastr);
  babel.transformSync(datastr, optionsObject);
});

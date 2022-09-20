const babel = require("@babel/core");
const fs = require("fs");
fs.readFile("./source_code.js", "utf8", function (err, datastr) {
  console.log("读取成功后的" + err);
  console.log("读取成功后的" + datastr);
  babel.transform(
    datastr,
    {
      plugins: ["@babel/plugin-transform-arrow-functions"],
    },
    function (err, result) {
      console.log("ast====>", result.ast);
      console.log("code====>", result.code);
    }
  );
});

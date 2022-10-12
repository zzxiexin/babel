const babel = require("@babel/core");
const fs = require("fs");
fs.readFile("./source_code.js", "utf8", async function (err, sourceCode) {
  console.log("读取成功后的" + err);
  console.log("读取成功后的" + sourceCode);
  const targetCode = babel.transform(sourceCode, {
    plugins: ["@babel/plugin-transform-arrow-functions"],
  });
  console.log(targetCode.code)
});

const fs = require('fs');
fs.readFile('./api.js','utf8',function(err,datastr){
    console.log('读取成功后的'+err);
    console.log('读取成功后的'+datastr);
    require("@babel/core").transformSync(datastr, {
        plugins: ["@babel/plugin-transform-arrow-functions"],
        configFile: false,
    }, function (err, result){
        console.log(11)
        console.log(result)
    })
  })

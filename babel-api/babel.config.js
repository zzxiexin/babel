module.exports = {
// json 格式 babel.config.json || .babelrc.json
    presets: [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage",
          "corejs": "3.25.2"
        }
      ],
      "@babel/preset-react",
      "@babel/preset-typescript"
    ],
    // plugins: [["@babel/plugin-transform-runtime", { "corejs": "3" }]]
  }
  // js 格式  babel.config.js || .babelrc.js 还可以根据环境配置；
  // const presets = [ ... ];
  // const plugins = [ ... ];
  
  // if (process.env["ENV"] === "prod") {
  //   plugins.push(...);
  // }
  
  // module.exports = { presets, plugins };

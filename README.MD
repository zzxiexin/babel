### 1、Preset

#### 定义： 所谓Preset就是一些Plugin组成的合集,你可以将Preset理解称为就是一些的Plugin整合称为的一个包。

@babel/preset-env：@babel/preset-env是一个智能预设，它可以将我们的高版本JavaScript代码进行转译根据内置的规则转译成为低版本的javascript代码，需要额外注意的是@babel/preset-env仅仅针对语法阶段的转译，比如转译箭头函数，const/let语法。针对一些Api或者Es6内置模块的polyfill，@babel/preset-env是无法进行转译的。这块内容我们会在之后的polyfill中为大家进行详细讲解。

@babel/preset-react：通常我们在使用React中的jsx时，相信大家都明白实质上jsx最终会被编译称为React.createElement()方法，这个预设起到的就是将jsx进行转译的作用。

@babel/preset-typescript：对于TypeScript代码，我们有两种方式去编译TypeScript代码成为JavaScript代码：

- 1、使用tsc命令，结合cli命令行参数方式或者tsconfig配置文件进行编译ts代码；
- 2、使用babel，通过@babel/preset-typescript代码进行编译ts代码；

------------



### 2、Plugins

#### 上面说过Presets其实就是plugins的组合，Babel官网列举出了一份非常详尽的[Plugin List](https://babeljs.io/docs/en/plugins-list "Plugin List")，想了解的可以自己查看下。   

------------

### 3、polyfill 
#### 定义：@babel/preset-env仅仅只会转化最新的es语法，并不会转化对应的Api和实例方法,比如说ES6中的Array.from静态方法。babel是不会转译这个方法的，如果想在低版本浏览器中识别并且运行Array.from方法达到我们的预期就需要额外引入polyfill进行在Array上添加实现这个方法。其实可以稍微简单总结一下，语法层面的转化preset-env完全可以胜任。但是一些内置方法模块，仅仅通过@babel/preset-env的语法转化是无法进行识别转化的，所以就需要一系列类似”垫片“的工具进行补充实现这部分内容的低版本代码实现。这就是所谓的polyfill的作用；

1. 在babel配置文件中使用@babel/polyfill：   
原理： 通过babelPolyfill通过往全局对象上添加属性以及直接修改内置对象的Prototype上添加方法实现polyfill。比如说我们需要支持String.prototype.include，在引入babelPolyfill这个包之后，它会在全局String的原型对象上添加include方法从而支持我们的Js Api。

 使用配置：在@babel/preset-env中存在一个useBuiltIns参数，这个参数决定了如何在@babel/preset-env中使用@babel/polyfill。
```javascript
    {
        "presets": [
            ["@babel/preset-env", {
                "useBuiltIns": false || 'entry' || 'usage '
            }]
        ]
    }
```
false: 不做语法模块兼容；
entry：入口全局做兼容；
usage ：对使用到的api做兼容，去除无需的api兼容；

 **缺点：**
 - 在usage情况下，如果我们存在很多个模块，那么无疑会多出很多冗余代码(import语法)；
 - 这种方式本质上是往全局对象/内置对象上挂载属性，所以这种方式难免会造成全局污染；
 
2. @babel/runtime   
上边我们讲到@babel/polyfill是存在污染全局变量的副作用，在实现polyfill时Babel还提供了另外一种方式去让我们实现这功能，那就是@babel/runtime。
简单来讲，@babel/runtime更像是一种按需加载的解决方案，比如哪里需要使用到Promise，@babel/runtime就会在他的文件顶部添加
```javascript
import promise from 'babel-runtime/core-js/promise'。
```
同时上边我们讲到对于@babel/preset-env的useBuintIns配置项，我们的polyfill是@babel/preset-env帮我们智能引入。
而@babel/runtime 则会将引入方式由智能完全交由我们自己，我们需要什么自己引入什么。
它的用法很简单，只要我们去安装npm install --save @babel/runtime后，在需要使用对应的polyfill的地方去单独引入就可以了。比如：     
// a.js 中需要使用Promise 我们需要手动引入对应的运行时polyfill   
```javascript
import Promise from 'babel-runtime/core-js/promise'
const promsies = new Promise()
```

 总而言之，@babel/runtime你可以理解称为就是一个运行时“哪里需要引哪里”的工具库。   
针对@babel/runtime 绝大多数情况下我们都会配合@babel/plugin-transfrom-runtime进行使用达到智能化runtime的polyfill引入。   

 ##### @babel/runtime 存在的问题
 babel-runtime在我们手动引入一些polyfill的时候，它会给我们的代码中注入一些类似_extend()，  classCallCheck()之类的工具函数，这些工具函数的代码会包含在编译后的每个文件中，比如：
```javascript
class Circle {}
// babel-runtime 编译Class需要借助_classCallCheck这个工具函数
function _classCallCheck(instance, Constructor) { //... } 
var Circle = function Circle() { _classCallCheck(this, Circle); };
```
如果我们项目中存在多个文件使用了class，那么无疑在每个文件中注入这样一段冗余重复的工具函数将是一种灾难。
所以针对上述提到的两个问题:

 @babel/runtime 无法做到智能化分析，需要我们手动引入。
 @babel/runtime  编译过程中会重复生成冗余代码。
 我们就要引入我们的主角@babel/plugin-transform-runtime。   
 
##### @babel/plugin-transform-runtime作用：

@babel/plugin-transform-runtime插件的作用恰恰就是为了解决上述我们提到的@babel/runtime 存在的问题而提出的插件。

@babel/runtime 无法做到智能化分析，需要我们手动引入。

@babel/plugin-transform-runtime插件会智能化的分析我们的项目中所使用到需要转译的js代码，从而实现模块化从@babel/runtime 中引入所需的polyfill实现。

@babel/runtime 编译过程中会重复生成冗余代码，@babel/plugin-transform-runtime插件提供了一个helpers参数。具体你可以在这里查阅它的所有配置参数。

这个helpers参数开启后可以将上边提到编译阶段重复的工具函数，比如classCallCheck, extends等代码转化称为require语句。此时，这些工具函数就不会重复的出现在使用中的模块中了。比如这样：

// @babel/plugin-transform-runtime会将工具函数转化为require语句进行引入   
// 而非runtime那样直接将工具模块代码注入到模块中     
```javascript
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck"); 
var Circle = function Circle() { _classCallCheck(this, Circle); };
```

##### 配置@babel/plugin-transform-runtime

这里为列一份目前它的默认配置:   
```javascript
// json 格式 babel.config.json || .babelrc.json
{
    "presets": [
      [
        "@babel/preset-env",
        // {
        //   "useBuiltIns": "usage",
        //   "corejs": "3.25.2"
        // }
      ],
      "@babel/preset-react",
      "@babel/preset-typescript"
    ],
    "plugins": [["@babel/plugin-transform-runtime", { "corejs": "3" }]]
  }
  // js 格式  babel.config.js || .babelrc.js 还可以根据环境配置；
  // const presets = [ ... ];
  // const plugins = [ ... ];
  
  // if (process.env["ENV"] === "prod") {
  //   plugins.push(...);
  // }
  
  // module.exports = { presets, plugins };
```
------------

### 4、项目中的babel使用和配置
关于WebPack中我们日常使用的babel相关配置主要涉及以下三个相关插件:   

1. babel-loader：babel-loader的本质就是一个函数，我们匹配到对应的jsx?/tsx?的文件交给babel-loader.  

3. @babel/core：babel-core是babel最核心的一个编译库，他可以将我们的代码进行词法分析--语法分析--语义分析过程从而生成AST抽象语法树，从而对于“这棵树”的操作之后再通过编译称为新的代码；

5. @babel/preset-env：上边我们说到babel-loader本质是一个函数，它在内部通过babel/core这个核心包进行JavaScript代码的转译。但是针对代码的转译我们需要告诉babel以什么样的规则进行转化，比如我需要告诉babel：“嘿，babel。将我的这段代码转化称为EcmaScript 5版本的内容！”。此时@babel/preset-env在这里充当的就是这个作用：告诉babel我需要以为什么样的规则进行代码转移；

详细配置：
```javascript
// json 格式 babel.config.json || .babelrc.json
{
    "presets": [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage",
          "corejs": "3.25.2"
        }
      ],
      [
        "@babel/preset-react",
        {
          "pragma": "dom", // default pragma is React.createElement (only in classic runtime)
          "pragmaFrag": "DomFrag", // default is React.Fragment (only in classic runtime)
          "throwIfNamespace": false, // defaults to true
          "runtime": "classic" // defaults to classic
          // "importSource": "custom-jsx-library" // defaults to react (only in automatic runtime)
        }
      ],
      ["@babel/preset-typescript"]
    ],
    "plugins": []
  }
  // js 格式  babel.config.js || .babelrc.js 还可以根据环境配置；
  // const presets = [ ... ];
  // const plugins = [ ... ];
  
  // if (process.env["ENV"] === "prod") {
  //   plugins.push(...);
  // }
  
  // module.exports = { presets, plugins };
```

#### 补充：
#### 1、插件先执行，预设后执行，plugins 是从左往右,preset 则是配置是从右往左；

#### 2、babel.config.json 的文件（需要 v7.8.0 或更高版本）；

#### 3、兼容新的API有两种方式，第一是使用presets里的@babel/preset-env 通过配置useBuiltIns配置项来优化代码大小，也可以使用plugins中的@babel/runtime配合@babel/plugin-transform-runtime来实现按需加载；

#### 4、我们使用 @babel/cli 从终端运行 Babel，利用 @babel/polyfill 来模拟所有新的 JavaScript 功能，而 @babel/preset-env 只对我们所使用的并且目标浏览器中缺失的功能进行代码转换和加载 polyfill;

#### 5、配置项优先级：babel.config.json < .babelrc < programmatic options from @babel/cli

#### 6.@babel/plugin-transform-runtime 该插件可以去除注入到文件的代码，改为require的方式引入，从而减小文件的体积；

### 7.babel默认会把代码编译成cjs模块，但是可以通过配置"modules": false保留esm模块，配置"@babel/plugin-transform-modules-umd"插件把代码编译成umd模块；   
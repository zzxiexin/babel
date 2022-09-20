#### 1、插件先执行，预设后执行，preset 配置是从右往左，plugins 则是从左往右；

#### 2、babel.config.json 的文件（需要 v7.8.0 或更高版本）；

#### 3、useBuiltIns 配置项是优化 polyfill 是否需要完整打包进去；

#### 4、我们使用 @babel/cli 从终端运行 Babel，利用 @babel/polyfill 来模拟所有新的 JavaScript 功能，而 @babel/preset-env 只对我们所使用的并且目标浏览器中缺失的功能进行代码转换和加载 polyfill;

#### 5、配置项优先级：babel.config.json < .babelrc < programmatic options from @babel/cli

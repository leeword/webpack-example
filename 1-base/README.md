### 模块打包工具

#### 版本 (截止 2019/11/22)

[第一个稳定版本](https://github.com/webpack/webpack/tree/v1.0.0)
[最新稳定版本](https://github.com/webpack/webpack/tree/v4.41.2)
[webpack5 最新 beta 版本](https://github.com/webpack/webpack/tree/v5.0.0-beta.7)

#### 主流打包工具特色

- gulp：内存中的流式处理，灵活，**task runner**
- parcel：支持以 `html` 为入口文件，**零配置**
- rollup：支持输出 **es module** 格式，主要用于三方库的打包，**tree-shaking** 友好
- webpack：强大的模块打包工具，适用于业务库的打包

#### webpack4: 支持零配置的 webpack 版本

默认入口： src/index.js
默认生成： dist/main.js
默认启动生产环境配置
每种 mode 会自动启用一些功能

##### package.json 字段

- module：ES module 文件入口
- main：一般是 commonjs 格式文件入口

#### 术语

[tree-shaking](https://webpack.js.org/guides/tree-shaking/#root)
又称 `DCE`，在前端，主要是指在打包阶段将一些无用代码去除

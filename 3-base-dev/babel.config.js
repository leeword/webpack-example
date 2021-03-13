// 三个阶段：解析，转换，生成

// 预设：插件的集合
// 执行顺序：从后向前
const presets = [
  '@babel/react',
];

// 插件：转换 js 语法
// 执行顺序：从前向后
const plugins = [
  '@babel/proposal-class-properties',
]

// plugins 优先于 presets 执行
module.exports = {
  presets,
  plugins,
}

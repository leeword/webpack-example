const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 模式
  // 'none' | 'development' | 'production'
  // https://webpack.js.org/configuration/mode/#mode-development
  // https://webpack.js.org/configuration/mode/#mode-production
  mode: 'development',

  // 入口配置
  // string | array | object
  entry: './src/app.js',

  // 输出配置
  output: {
    filename: 'bundle.js',
    // 输出目录
    path: path.resolve(__dirname, 'build'),
  },

  // 默认只处理 js 文件，其他文件类型要通过相应的 loader 转换
  // 资源处理相关
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        // 如果存在多个 loader， 执行顺序从后向前
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },

  // 增强功能，处理各式各样的任务
  plugins: [
    new HtmlWebpackPlugin(),
  ],

  // ==================================================

  // 外部扩展，一般用于通过cdn引入库时，将三方库从构建产物中剔除
  externals: {},

  // 模块解析相关
  resolve: {
    // 路径别名，懒癌福音
    alias: {
      $src: path.resolve(__dirname, 'src'),
    },
    // mainFields: ['browser', 'module', 'main'],
  },

  // 构建产物支持的环境
  target: 'web',

  // 打包产物性能评估
  performance: false,

  // 终端输出信息控制
  stats: 'errors-only',
}

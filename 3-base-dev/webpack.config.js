const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  // entry: {
  //   xzone: './src/xxx',
  //   tracker: './src/xxx',
  // },
  output: {
    filename: '[name].js',
  },
  resolve: {
    alias: {
      '$src': resolve(__dirname, 'src'),
    },
  },
  module: {

    rules: [
      {
        // 编译为低版本浏览器可执行的js
        test: /\.m?js$/,
        use: [
          'babel-loader',
        ],
      },
      {
        // 处理 css
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true
            },
          },
          'sass-loader',
        ],
      },
      {
        // 处理图片
        test: /\.(gif|png|jpe?g|webp|svg)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        // 处理字体
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: {
          // 处理文件
          loader: 'file-loader',
        },
      },
    ],
  },
  // sourceMap，将打包之后的代码映射到源文件
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'cheap-module-eval-source-map',
  // 基于 express
  devServer: {
    hot: true,
    open: true,
  },
  plugins: [
    // 生成 html 文件
    new HtmlWebpackPlugin(),
  ],
}

const { resolve } = require('path');
const os = require('os');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const cpusLength = os.cpus().length;

module.exports = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    './src/main.js',
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
    pathinfo: false,
  },
  resolve: {
    alias: {
      '$src': resolve(__dirname, 'src'),
      'react-dom$': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: resolve(__dirname, 'node_modules'),
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: cpusLength,
            },
          },
          'babel-loader?cacheDirectory',
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: cpusLength,
            },
          },
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|webp|svg)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'font/[name].[ext]',
          },
        },
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    open: true,
    // h5 路由支持
    historyApiFallback: true,
    stats: 'errors-only',
    watchOptions: {
      // 不监听第三方文件的变动
      ignored: /node_modules/,
      // 构建延迟
      aggregateTimeout: 300,
      // 轮训间隔
      poll: 1000,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public/index-dev.html'),
      // https://github.com/jantimon/html-webpack-plugin/issues/870
      chunksSortMode: 'none',
    }),
    new LodashModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(
      /moment[\\\/]locale$/,
      /^\.\/(zh-cn)$/,
    ),
  ],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
}

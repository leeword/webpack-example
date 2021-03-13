const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].js',
  },
  resolve: {
    alias: {
      '$src': resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|webp|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 10kb 阈值
              limit: 1024 * 10,
              name: 'image/[name].[hash:8].[ext]',
              fallback: 'file-loader',
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'font/[name].[hash:8].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    // 打包清理构建产物
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // 压缩 html 文件
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // 将 css 抽成单独的文件
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash:8].css',
      chunkFileName: 'style/[name].[contenthash:8].chunk.css',
    }),
    // 压缩 css
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}

if (process.env.SHOW_REPORT === '1') {
  // 分析打包文件
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config;

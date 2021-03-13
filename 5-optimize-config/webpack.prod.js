const { resolve, relative } = require('path');
const os = require('os');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const PurgeCssPlugin = require('purgecss-webpack-plugin');

const cpusLength = os.cpus().length;

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
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        // 忽略三方模块文件
        exclude: resolve(__dirname, 'node_modules'),
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: cpusLength,
            },
          },
          // 开启编译产物缓存
          'babel-loader?cacheDirectory',
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
              limit: 1024 * 10,
              name: 'image/[name].[hash:8].[ext]',
              fallback: 'file-loader',
            },
          },
          {
            // 压缩图片
            // https://tinypng.com/
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.6, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'font/[name].[contenthash:8].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 切割 lodash
    new LodashModuleReplacementPlugin(),
    // 为动态 import 且没有提供 webpackChunkName 的包生成可控的名称
    new webpack.NamedChunksPlugin(
      chunk => chunk.name || Array.from(chunk.modulesIterable, m => relative(m.context, m.request)).join('_'),
    ),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'public/index-prod.html'),
      chunksSortMode: 'none',
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
    // moment 语言包消除
    new webpack.ContextReplacementPlugin(
      /moment[\\\/]locale$/,
      /^\.\/(zh-cn)$/,
    ),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash:8].css',
      chunkFileName: 'style/[name].[contenthash:8].chunk.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    // fix css generate js file in webpack4
    new FixStyleOnlyEntriesPlugin(),
    // inline webpack manifest to html
    new InlineManifestWebpackPlugin('manifest'),
    // css tree-shaking
    new PurgeCssPlugin({
      paths: glob.sync(resolve(__dirname, 'src/**/*.js'), { nodir: true }),
    }),
  ],
  optimization: {
    // 模块ID
    // https://webpack.js.org/configuration/optimization/#optimizationmoduleids
    moduleIds: 'hashed',
    splitChunks: {
      // 分包
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
}

// analysis bundle size
if (process.env.SHOW_REPORT === '1') {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config;

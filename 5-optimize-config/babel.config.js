const presets = [
  [
    '@babel/env',
    {
      // 关闭模块转换功能
      modules: false,
      useBuiltIns: 'usage',
      corejs: 2,
      loose: true,
    },
  ],
  '@babel/react',
];

const plugins = [
  [
    'import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    },
  ],
  'lodash',
  '@babel/syntax-dynamic-import',
  [
    '@babel/proposal-class-properties',
    {
      loose: true,
    },
  ],
  [
    'transform-react-remove-prop-types',
    {
      mode: 'wrap',
      ignoreFilenames: ['node_modules'],
    },
  ],
];

// enable hot-loader in development
// and disabled it for less transform code when we build bundle in production mode
if (process.env.NODE_ENV === 'development') {
  plugins.unshift('react-hot-loader/babel')
}

module.exports = {
  presets,
  plugins,
};

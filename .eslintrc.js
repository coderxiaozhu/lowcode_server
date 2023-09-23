module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["eslint:recommended",  "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: ['error', 4], // 用于指定代码缩进的方式，这里配置为使用四个空格进行缩进。
    'linebreak-style': [0, 'error', 'windows'], // 用于指定换行符的风格，这里配置为使用 Windows 风格的换行符（\r\n）。
    quotes: ['error', 'single'], // 用于指定字符串的引号风格，这里配置为使用单引号作为字符串的引号。
    semi: ['error', 'always'], //用于指定是否需要在语句末尾添加分号，这里配置为必须始终添加分号。
    '@typescript-eslint/no-explicit-any': ['off'], // 用于配置 TypeScript 中的 "any" 类型的使用规则，这里配置为关闭禁止显式使用 "any" 类型的检查。
  },
  plugins: [
    "prettier"
  ]
};

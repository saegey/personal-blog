const babelOptions = {
  presets: ['babel-preset-gatsby', '@babel/preset-typescript'],
  plugins: ['@emotion'],
}

module.exports = require('babel-jest').createTransformer(babelOptions)

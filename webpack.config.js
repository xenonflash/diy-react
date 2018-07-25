const HtmlWebpackPlugin = require('html-webpack-plugin')
const $path = require('path')

module.exports = {
  mode: 'development',
  entry: $path.resolve(__dirname, 'src/index.js'),
  output: {
    path: $path.resolve(__dirname, './dist'),
    filename: 'bundle-[hash].js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: $path.resolve(__dirname, './node_modules'),
        use: [ 'babel-loader' ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: $path.resolve(__dirname, './template/index.html'),
    })
  ]
}
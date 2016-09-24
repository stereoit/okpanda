const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = env => {
  return {
    entry: './main.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'app.bundle.[chunkhash].js',
        pathinfo: !env.prod,
    },
    context: resolve(__dirname, 'src'),
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, ]
    },
    plugins:[
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ]
  }
}

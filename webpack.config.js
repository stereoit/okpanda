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
    devtool: 'source-map',
    context: resolve(__dirname, 'src'),
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
          test: /.remote\.js$/,
          loader: 'webpack-replace',
          query: {
            search: '__REMOTE_SERVER__',
            replace: env.dev ? 'http://127.0.0.1:8081' : 'http://127.0.0.1:8080'
          }
        }
      ]
    },
    plugins:[
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ]
  }
}

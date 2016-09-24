const {
    resolve
} = require('path')
module.exports = env => {
    return {
        entry: './main.js',
        output: {
            path: resolve(__dirname, 'dist'),
            filename: 'app.bundle.js',
            pathinfo: !env.prod,
        },
        context: resolve(__dirname, 'src'),
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }, ]
        }
    }
}

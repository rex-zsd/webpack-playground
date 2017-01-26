var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.config');

var devConfig = {
    devServer: {
        contentBase: baseConfig.output.path,
        host: '0.0.0.0',
        port: parseInt(process.env.PORT, 10) || 8080,
        historyApiFallback: false,
        compress: true,
        hot: true,
        https: JSON.parse(process.env.HTTPS || 'false'),
        publicPath: baseConfig.output.publicPath,
        open: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = merge(baseConfig, devConfig);

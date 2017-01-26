var webpack = require('webpack');
var merge = require('webpack-merge');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

var config = require('./webpack.config');

var prodConfig = {
    plugins: [
        // new HtmlWebpackInlineSourcePlugin(),
        new webpack.optimize.CommonsChunkPlugin({name: 'common', minChunks: Infinity}),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            beautify: false,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true,
                collapse_vars: true,
                reduce_vars: true
            }
        }),
        new CleanWebpackPlugin(['dist'], {
            root: __dirname, //  An absolute path for the root.
            verbose: true, //  Write logs to console.
            dry: false //  Do not delete anything, good for testing.
        })
    ]
};

module.exports = merge(config, prodConfig);

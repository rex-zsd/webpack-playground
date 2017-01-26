var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

var pages = require('./tools/page')('./src/p');

var config = {
    target: 'web',
    devtool: 'source-map',
    context: __dirname,
    entry: {
        common: 'expose-loader?YB!./src',
        'boot': './src/boot'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: ExtractTextPlugin.extract({
                            fallbackLoader: 'style-loader',
                            loader: ['css-loader', 'postcss-loader', 'less-loader']
                        })
                    }
                }
            }, {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: ['node_modules'],
                options: {
                    cacheDirectory: true
                }
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css-loader', 'postcss-loader', 'less-loader']
                })
            }
        ]
    },
    resolve: {
        extensions: [
            '.js', '.jsx', '.json'
        ],
        modules: [path.resolve(__dirname, 'node_modules')],
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    plugins: [
        new ExtractTextPlugin({filename: '[name].css', allChunks: true}),
        new webpack.ProvidePlugin({Vue: 'vue'}),
        new webpack.DefinePlugin({
            'process.env': {
                CLIENT: JSON.stringify(true),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                APP: JSON.stringify(false)
            }
        })
    ]
};

pages.forEach(function(item) {
    config.entry[item.name] = 'expose-loader?PAGES!' + item.entry;
    config.plugins.push(new HtmlWebpackPlugin({
        title: item.title || 'webpack demo',
        inject: true,
        chunks: [
            'common', item.name, 'boot'
        ],
        chunksSortMode: function(a, b) {
            if (b.names[0] === 'common') {
                return true;
            } else if (b.names[0] === 'boot') {
                return false;
            } else {
                return a.names[0] < b.names[0];
            }
        },
        inlineSource: '(' + item.name + '|boot)\.(.)*(js|css)',
        hash: true,
        template: './src/index.html',
        filename: item.name + '.html',
        // favicon: './src/favicon.ico',
        minify: {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            minifyCSS: true,
            minifyJS: true
            // removeComments: true
        }
    }));
});

module.exports = config;

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');

function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/index.js',
        //vendor: ['axios', 'react', 'react-dom', 'antd-mobile', 'react-redux', 'react-router-dom', 'redux', 'redux-thunk']
    },
    plugins: [
        new CleanWebpackPlugin(
            ['*'], {
                root: resolve("dist"),
                verbose: true,
                dry: false
            }
        ),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),
        new HtmlWebpackPlugin({
            title: '',
            template: resolve("index.html"),
            inject: true
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        })
    ],
    output: {
        filename: '[name].[chunkhash].js',
        path: resolve('dist'),
        chunkFilename: "[id].[chunkHash:8].js"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', ".css", "png", "jpg", "gif"],
        alias: {
            '@': resolve('src')
        },
        symlinks: false
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: [resolve("src")],
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/img/[name].[ext]'
                    }
                }]
            }
        ]
    }
};
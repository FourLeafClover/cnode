const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const webpack = require('webpack');
const path = require('path');
module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist/'),
        port: 666
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('dev')
            }
        })
    ]
});
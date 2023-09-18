const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        'zip-extract': './lib/zip-extract.js',
        'zip-extract.min': './lib/zip-extract.js',
        // 'test': './test/test.js'
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
        }),
    ],
    devServer: {
        static: './dist',
    },
    optimization: {
        runtimeChunk: 'single',
    },
    output: {
        filename: '[name].js',
        library: 'zip-extract',
        libraryTarget: 'umd',
        libraryExport: 'default',
        clean: true
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/
            })
        ]
    }
}
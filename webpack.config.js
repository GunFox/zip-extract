const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        'zip-extract': './lib/zip-extract.js',
        'zip-extract.min': './lib/zip-extract.js',
    },
    mode: 'production',
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
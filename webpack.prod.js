const HtmlWebPackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {

    mode: 'production',
    optimization: {
        minimizer:  [ new OptimizeCssAssetsWebpackPlugin() ]
    },
    output: {
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /styles\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/i,
                use: [
                     MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options:{
                    minimize: false,
                    sources: false,
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        }
                    }
                ]
            },
            {
                test: /\.js$/i,
                exclude: /node-modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns:[
                { from: 'src/assets', to: 'assets/' }
            ]
        }),
        new MinifyPlugin()
    ]

}
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const apiMocker = require('webpack-api-mocker');

const webpackConfig = {
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist/",
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_module/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: `${__dirname}/src/public/entry.ejs`,
            filename:  'index.html',
            minify: null,
            hash: true,
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        publicPath: "/dist/",
        compress: true,
        hot: true,
        disableHostCheck: true,
        watchOptions: {
            ignored: /node_modules/,
        },
        historyApiFallback:{
            index:"/dist/index.html",
            disableDotRule: true,
            logger: console.log.bind(console),
            htmlAcceptHeaders:['text/html', '*/*']
        },
        inline :true,
        //添加测试数据
        before(app) {
            apiMocker(app, path.resolve('./mock'));
        }
    }
}
module.exports = webpackConfig
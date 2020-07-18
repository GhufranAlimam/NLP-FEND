const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: "production",
    entry: './app/client/index.js',
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./app/client/views/index.html",
            filename: "./index.html"
        })
    ]

}
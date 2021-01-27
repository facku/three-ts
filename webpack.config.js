const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

// http://webpack.github.io/docs/configuration.html
module.exports = {
  mode: "development",
  entry: {
    main: "./src/main.ts",
  },

  // Outputs compiled bundle to `./web/js/main.js`
  output: {
    path: __dirname + "/dist/",
    filename: "js/[name].js",
  },

  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({ title: "Three.js and Webpack" })],

  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js"],
  },

  module: {
    // Test file extension to run loader
    rules: [
      {
        test: /\.ts?$/,
        exclude: [/node_modules/, /tsOld/],
        loader: "ts-loader",
      },
    ],
  },

  // Enables dev server to be accessed by computers in local network
  devServer: {
    host: "localhost",
    port: 8080,
    // publicPath: path.join(__dirname, "src"),
    compress: true,
    // contentBase: [path.join(__dirname, "src")],
    // disableHostCheck: true,
  },
};

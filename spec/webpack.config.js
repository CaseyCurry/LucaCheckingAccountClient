/* eslint-env node */
"use strict";

const applicationConfigs = require("../webpack.config.js");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = () => {
  const html = {
    filename: "index.html",
    template: path.resolve(__dirname, "../src/app/index.html")
  };
  const configs = [];
  configs.push({
    entry: ["mocha-loader!./spec/index.js"],
    devServer: {
      host: "localhost"
    },
    devtool: "inline-sourcemap",
    plugins: [new HtmlWebpackPlugin({
      filename: "specs.html"
    })],
    module: {
      rules: [{
        test: /\.js/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }]
    }
  }, {
    name: "app",
    context: __dirname,
    entry: ["../src/app/index.js"],
    output: {
      path: "/",
      filename: "index.min.js"
    },
    module: {
      rules: [{
        enforce: "pre",
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }, {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.scss/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            "sass-loader"
          ]
        })
      }]
    },
    resolve: {
      extensions: [
        ".js",
        ".jsx",
        ".scss"
      ]
    },
    devtool: "inline-sourcemap",
    plugins: [
      new ExtractTextPlugin("checking-acct.css"),
      new HtmlWebpackPlugin({
        filename: html.filename,
        template: html.template
      })
    ]
  });
  configs.push(...applicationConfigs);
  return configs;
};

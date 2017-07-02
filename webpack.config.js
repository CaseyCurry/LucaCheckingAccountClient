/* eslint-env node */
"use strict";

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

module.exports = [{
  name: "host",
  context: __dirname,
  target: "node",
  node: {
    __dirname: false
  },
  entry: ["./src/host.js"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "host.js"
  },
  module: {
    rules: [{
      enforce: "pre",
      test: /\.(js|jsx)/,
      exclude: /(node_modules)/,
      use: [{
        loader: "eslint-loader"
      }]
    }, {
      test: /\.(js|jsx)/,
      exclude: /(node_modules)/,
      use: [{
        loader: "babel-loader"
      }]
    }]
  }
}, {
  name: "library",
  context: __dirname,
  entry: ["./src/app/App.jsx"],
  output: {
    path: path.join(__dirname, "dist/app"),
    filename: "app.min.js",
    library: "CheckingAccountService",
    libraryTarget: "var"
  },
  externals: {
    "react": "React"
  },
  module: {
    rules: [{
      enforce: "pre",
      test: /\.(js|jsx)/,
      exclude: /node_modules/,
      use: [{
        loader: "eslint-loader"
      }]
    }, {
      test: /\.(js|jsx)/,
      exclude: /node_modules/,
      use: [{
        loader: "babel-loader"
      }]
    }, {
      test: /\.scss/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: "style-loader",
        loader: [
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
  plugins: [
    new ExtractTextPlugin("checking-account.css")
  ]
}];

const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
})

module.exports = () => ({
  devtool: "inline-source-map",
  target: "electron-renderer",
  output: {
    path: path.resolve(__dirname, "reactAppBuild"),
    filename: "bundle.js"
  },
  externals: {
    typeorm: "require('typeorm')",
    sqlite3: "require('sqlite3')"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
  },
  plugins: [htmlPlugin]
})

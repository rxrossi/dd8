const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
})

module.exports = () => ({
  devtool: "inline-source-map",
  target: "electron-renderer",
  output: {
    path: path.resolve(__dirname, "reactAppBuild")
  },
  externals: {
    typeorm: "require('typeorm')",
    sqlite3: "require('sqlite3')"
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, "src/"),
      entity: path.resolve(__dirname, "src/entity/"),
      testUtils: path.resolve(__dirname, "testUtils/")
    },
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        loader: "file-loader",
        options: {}
      }
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [new CleanWebpackPlugin(), htmlPlugin]
})

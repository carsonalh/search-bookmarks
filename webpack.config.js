const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    background: "./src/background.ts",
    options: "./src/options.ts",
    popup: "./src/popup/index.tsx",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              [
                "@babel/plugin-transform-runtime",
                {
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "manifest.json",
          to: "manifest.json",
        },
        {
          from: "images",
          to: "images",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: "src/popup/index.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      filename: "options.html",
      template: "src/options.html",
      chunks: ["options"],
    }),
  ],
};

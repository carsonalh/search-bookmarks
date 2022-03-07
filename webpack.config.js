const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    background: "./src/background.js",
    options: "./src/options.js",
    popup: "./src/popup.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
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
              // "@babel/preset-react",
              [
                "@babel/preset-typescript",
                {
                  isTSX: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
};

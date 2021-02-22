// Webpack uses this to work with directories
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
      main: "./src/index.ts",
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "[name]-bundle.js",
    },
    resolve: {
      // Add ".ts" and ".tsx" as resolvable extensions.
      extensions: [".ts", ".tsx", ".js"],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: "ts-loader" },
      ],
    },
    plugins: [
        new CopyWebpackPlugin(
            { 
              patterns: [
                { from: './html', to: 'index.html' },
                { from: './styles', to: 'index.css' },
              ]
            }
          ),
    ],
  };
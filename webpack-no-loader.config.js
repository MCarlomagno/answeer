const path = require('path');

module.exports = {
  entry: {
    main: "./dist/main.js",
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-bundle.js',
  },
  plugins: [
    new CopyWebpackPlugin(
        { 
          patterns: [
            { from: './html', to: 'index.html' },
          ]
        }
      ),
  ],
};
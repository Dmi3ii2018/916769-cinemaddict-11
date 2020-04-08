const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8080,
    watchContentBase: true,
  }
};

const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const devServer = () => ({
  devServer: {
    open: true,
    hot: true,
    port: 3000,
    historyApiFallback: true,
  },
});

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  ...devServer(),
});
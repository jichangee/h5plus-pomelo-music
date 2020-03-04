const path = require('path');

module.exports = {
  publicPath: './',
  devServer: {
    port: 3030
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: ['/Users/xuejichang/Desktop/h5plus-pomelo-music/src/styles/global.less']
    }
  },
}

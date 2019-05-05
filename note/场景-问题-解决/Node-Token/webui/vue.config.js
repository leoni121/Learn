const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: 'error',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('store', resolve('src/store'))
      .set('router', resolve('src/router'))
      .set('public', resolve('public'))
      .set('views', resolve('src/views'));
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  }
};

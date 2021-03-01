'use strict'
const port =  80

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 80,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '^/admin': {
        target: 'https://hfjava.cn:443/',
        secure: false,
        ws: true,
        changOrigin: true,
        pathRewrite: {//重写路径
          "^/admin": ''//代理路径
        }
      }
    }
  }
}

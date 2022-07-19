const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/base.scss";'
      }
    }
  },
  lintOnSave: false,
  devServer:{
    proxy:{
      '/api':{
        target:'http://yanxuan.xiecheng.live:7001',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
})

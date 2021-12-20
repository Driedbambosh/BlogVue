const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin")

function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463
   */
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,


  //打包app时放开该配置
  //publicPath:'./',
  configureWebpack: config => {
    //生产环境取消 console.log
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
        .set('@$', resolve('src'))
        .set('@api', resolve('src/api'))
        .set('@assets', resolve('src/assets'))
        .set('@comp', resolve('src/components'))
        .set('@views', resolve('src/views'))
        .set('@layout', resolve('src/layout'))
        .set('@static', resolve('src/static'))
        .set('@mobile', resolve('src/modules/mobile'))

    //生产环境，开启js\css压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(new CompressionPlugin({
        test: /\.js$|.\css|.\less/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false // 不删除源文件
      }))
    }

    // 配置 webpack 识别 markdown 为普通的文件
    config.module
        .rule('markdown')
        .test(/\.md$/)
        .use()
        .loader('file-loader')
        .end()
  },

  devServer: {
    port: 3000,
    proxy: {
      '/my-blog': {
        // target: 'http://81.69.219.182:8088/', //外网 
        target: 'http://localhost:8088/', //内网 
        // target: 'http://192.168.0.117:8088/', //内网 
        ws: false,
        changeOrigin: true
      },
    }
  },

  lintOnSave: false
}

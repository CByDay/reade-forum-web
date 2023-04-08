const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  // chainWebpack: config => {
  //   // 添加别名
  //   config.resolve.alias
  //     .set("@", resolve("src"))

  // },
  //ReferenceError: resolve is not defined
//resolve是node的模块 要导入
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        //@ = d:xx/../src
        additionalData: `@import "~@/assets/scss/main.scss";`
      },
    }
  },

  devServer: {
    host: "0.0.0.0",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌

    // 配置跨域代理
    proxy: {
      // 说明：
      // 浏览器有同源策略不支持跨域，但服务器没有，通过proxy配置，将对于接口服务器的请求代理到本地服务器，
      // 再由本地服务器转发到接口服务器（target目标服务器），所以设置代理后，
      // 接口请求路径会变成代理服务器地址，即本地地址localhost 或者 127.0.0.1

      // 配置：
      // '/api'可以是任何值，表示以/api开头的请求，实际项目中所以路径以/api开头的请求都会被本地服务器转发
      '/api': {
        // target指想要被代理的后端接口服务器地址(目标路径)(真正请求的服务器地址) 192.168.177.1 本机
        target: 'http://192.168.177.1:4000',
        // pathRewrite用以在发送请求时，重写请求路径
        // 如果在实际的请求路径中你不希望出现/api，那么可以重写路径，在请求路径中去掉/api，如下所示
        pathRewrite: {
          // 举例：
          // 如果你的接口服务地址为：http://192.168.6.267:8080，你的接口路径为/base/company/list
          // 那么为了可以使用/api代理，你可以在接口路径前添加/api，如：/api/base/company/list
          // 那么你的请求就会被本地服务代理到真正的接口地址，解决了跨域问题
          // 但是你的请求路径就会变成：http://192.168.6.267:8080/api/base/company/list，路径中多余/api
          // 那么你可以通过重写（如下方式）去掉/api
          // 或者你可以选择将/api改为/base，就不需要重写路径了，具体的使用根据业务来决定
          '^/api': ''
        }
      }
    },
  },
});

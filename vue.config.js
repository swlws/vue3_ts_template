const path = require("path");

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  lintOnSave: true,
  publicPath: "./",
  chainWebpack: (config) => {
    config.resolve.alias.set("@lib", resolve("src/lib"));
  },
  devServer: {
    https: false,
    host: "0.0.0.0",
    port: 3000,
    index: "index.html",
    hot: true,
    hotOnly: true,
    clientLogLevel: "silent", // 日志等级，过滤日志
    compress: true, // 启用压缩
    contentBase: resolve("public"), // 上下文路径
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8081",
        changeOrigin: true,
      },
    },
  },
};
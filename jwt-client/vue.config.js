// const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

const { defineConfig } = require("@vue/cli-service");
// const { AutoImport } = require("unplugin-auto-import/vite");
// const { Components } = require("unplugin-vue-components/vite");
module.exports = defineConfig({
  transpileDependencies: true,
  // plugins: [
  // ...
  // AutoImport({
  //   resolvers: [ElementPlusResolver()],
  // }),
  // Components({
  //   resolvers: [ElementPlusResolver()],
  // }),
  // ],
  devServer: {
    proxy: "http://localhost:5000",
  },
  configureWebpack: {
    devtool: "source-map",
  },
});

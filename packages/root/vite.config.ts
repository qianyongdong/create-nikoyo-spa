import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginSingleSpa from "vite-plugin-single-spa";
import remoteCopyPlugin from "vite-plugin-remote-copy";

// 导入映射覆盖版本
const IMPORT_MAP_OVERRIDES_VERSION = "3.1.1";
// 导入映射覆盖版本 带名称
const IMPORT_MAP_OVERRIDES_VERSION_WITH_NAME = `import-map-overrides@${IMPORT_MAP_OVERRIDES_VERSION}`;
// 导入映射覆盖版本 带完整名称
const IMPORT_MAP_OVERRIDES_VERSION_WITH_FULL_NAME = `${IMPORT_MAP_OVERRIDES_VERSION_WITH_NAME}.js`;
// 导入映射覆盖版本 开发环境url
const IMPORT_MAP_OVERRIDES_DEV_URL = `https://cdn.jsdelivr.net/npm/${IMPORT_MAP_OVERRIDES_VERSION_WITH_NAME}/dist/import-map-overrides.js`;
// 导入映射覆盖版本 生产环境url
const IMPORT_MAP_OVERRIDES_PROD_URL = `/${IMPORT_MAP_OVERRIDES_VERSION_WITH_FULL_NAME}.js`;

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    vitePluginSingleSpa({
      type: "root",

      // imo: IMPORT_MAP_OVERRIDES_VERSION, //指定版本，打包后会成为脚本引入或者通过函数自定义url 如 ()=> url as string
      //为什么不统一使用打包后路径？因为imo的版本号会变化，如果使用打包后路径，会导致版本更改需要每次必须先打包触发本地下载才能保证与开发模式统一版本
      imo: () =>
        mode === "development"
          ? IMPORT_MAP_OVERRIDES_DEV_URL
          : IMPORT_MAP_OVERRIDES_PROD_URL,

      // // 如果开发环境使用 importMap.dev.json，生产环境使用 importMap.json 如果
      // importMaps: {
      //   dev: ["src/importMap.dev.json", "src/importMap.shared.json"],
      //   build: ["src/importMap.json", "src/importMap.shared.json"],
      // },
    }),
    remoteCopyPlugin({
      targets: [
        {
          src: IMPORT_MAP_OVERRIDES_DEV_URL,
          rename: IMPORT_MAP_OVERRIDES_VERSION_WITH_FULL_NAME,
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));

//import type { NextConfig } from "next";

//const nextConfig: NextConfig = {
 // typedRoutes: false,
 // outputFileTracingRoot: process.cwd()
//};

//export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 开启静态导出，生成 out 文件夹
  output: "export",

  // 部署子路径（必须与 CloudBase 的 /babylearning 一致）
  basePath: "/babylearning",
  assetPrefix: "/babylearning",

  // 静态导出必须禁用图片优化
  images: {
    unoptimized: true,
  },

  // 避免子路径下相对路由跳转 404
  trailingSlash: true,
};

export default nextConfig;
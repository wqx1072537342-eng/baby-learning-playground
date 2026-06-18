import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/babylearning",
  assetPrefix: "/babylearning",
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: true
  },
  trailingSlash: true
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/junior-math",
  assetPrefix: "/junior-math/",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/junior-math",
  },
};

export default nextConfig;

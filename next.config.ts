import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "headless-blog.local",
        pathname: "/wp-content/uploads/**",
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;

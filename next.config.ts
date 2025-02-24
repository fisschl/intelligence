import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/translate",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/articles",
        permanent: true,
      },
    ];
  },
  output: "standalone",
};

export default nextConfig;

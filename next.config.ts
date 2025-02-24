import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  async redirects() {
    return [
      {
        source: "/translate",
        destination: "/translate/articles",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

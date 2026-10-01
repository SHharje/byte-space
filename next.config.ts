import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/creators",
        destination: "/creators/purepearl-studio",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

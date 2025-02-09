import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crimson-historical-newt-559.mypinata.cloud",
      },
    ],
  },
};

export default nextConfig;

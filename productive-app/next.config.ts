import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true, // This is a permanent redirect (HTTP 308)
      },
    ];
  },
};

export default nextConfig;

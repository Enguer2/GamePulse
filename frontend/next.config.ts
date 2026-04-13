import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com", 
      "shared.akamai.steamstatic.com",
      "cdn.akamai.steamstatic.com"
    ],
  }
};

export default nextConfig;
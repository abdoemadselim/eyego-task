import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  // This creates a minimal production server with only necessary files
  output: 'standalone',

  async rewrites() {
    return [
      // Proxy UI routes (public stuff)
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL}/:path*`
      },
    ]
  },
};

export default nextConfig;


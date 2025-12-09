import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   
  typescript: {
    ignoreBuildErrors: true,
  },
  images : {
    remotePatterns : [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/Route-Academy-*/**'
      }
    ]
  }
};

export default nextConfig;

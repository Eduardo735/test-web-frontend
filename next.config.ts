import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
    clientSegmentCache: true,
    nodeMiddleware: true
  },
};

export default nextConfig;

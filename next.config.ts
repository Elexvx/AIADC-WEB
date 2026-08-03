import type { NextConfig } from 'next';
import { createMDX } from 'fumadocs-mdx/next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/participation/',
        permanent: true,
      },
      {
        source: '/docs/overview',
        destination: '/docs/participation/#一参赛组别',
        permanent: true,
      },
      {
        source: '/docs/participation/groups',
        destination: '/docs/participation/#一参赛组别',
        permanent: true,
      },
      {
        source: '/docs/participation/tracks',
        destination: '/docs/participation/#二申报赛道',
        permanent: true,
      },
      {
        source: '/docs/schedule',
        destination: '/docs/participation/#五2026-赛程安排',
        permanent: true,
      },
      {
        source: '/docs/faq',
        destination: '/docs/participation/',
        permanent: true,
      },
      {
        source: '/docs/contact',
        destination: '/docs/participation/#七联系方式',
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);

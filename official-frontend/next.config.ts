import type { NextConfig } from 'next';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  trailingSlash: true,
  turbopack: {
    root: join(projectRoot, '..'),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

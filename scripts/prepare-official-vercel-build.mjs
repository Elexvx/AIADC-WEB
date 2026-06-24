import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const officialDir = path.join(rootDir, 'official-frontend');

function assertInsideRoot(targetPath) {
  const relative = path.relative(rootDir, targetPath);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Refusing to write outside repository root: ${targetPath}`);
  }
}

function copyEntry(sourceRelative, targetRelative = sourceRelative) {
  const source = path.join(officialDir, sourceRelative);
  const target = path.join(rootDir, targetRelative);

  if (!fs.existsSync(source)) {
    throw new Error(`Missing official frontend build source: ${sourceRelative}`);
  }

  assertInsideRoot(target);
  fs.rmSync(target, { recursive: true, force: true });
  fs.cpSync(source, target, { recursive: true });
}

copyEntry('src');
copyEntry('public');
copyEntry('postcss.config.mjs');
copyEntry('tailwind.config.ts');
copyEntry('tsconfig.json');
copyEntry('next-env.d.ts');

const tsconfigPath = path.join(rootDir, 'tsconfig.json');
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
tsconfig.exclude = [
  'node_modules',
  'out',
  '.next',
  'admin-backend',
  'admin-frontend',
  'official-frontend',
];
fs.writeFileSync(tsconfigPath, `${JSON.stringify(tsconfig, null, 2)}\n`);

fs.writeFileSync(
  path.join(rootDir, 'next.config.ts'),
  `import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
`,
);

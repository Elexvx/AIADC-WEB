import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const nextDir = path.join(projectRoot, '.next');
const outDir = path.join(projectRoot, 'out');

if (!fs.existsSync(nextDir) || !fs.existsSync(outDir)) {
  process.exit(0);
}

const filesToCopy = [
  'routes-manifest.json',
  'prerender-manifest.json',
  'build-manifest.json',
  'app-path-routes-manifest.json',
  'images-manifest.json',
  'export-marker.json',
  'export-detail.json',
];

for (const fileName of filesToCopy) {
  const sourceFile = path.join(nextDir, fileName);
  const targetFile = path.join(outDir, fileName);

  if (!fs.existsSync(sourceFile)) {
    continue;
  }

  fs.copyFileSync(sourceFile, targetFile);
}

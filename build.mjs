import * as esbuild from 'esbuild';
import { copyFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

mkdirSync(join(__dirname, 'dist'), { recursive: true });

await esbuild.build({
  entryPoints: [join(__dirname, 'src/index.tsx')],
  bundle: true,
  format: 'esm',
  outfile: join(__dirname, 'dist/index.es.js'),
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  jsx: 'automatic',
});

await esbuild.build({
  entryPoints: [join(__dirname, 'src/index.tsx')],
  bundle: true,
  format: 'cjs',
  outfile: join(__dirname, 'dist/index.cjs.js'),
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  jsx: 'automatic',
});

copyFileSync(join(__dirname, 'src/styles.css'), join(__dirname, 'dist/styles.css'));

console.log('Build complete: dist/');

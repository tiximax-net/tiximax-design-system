import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
// Repo root (design-system) holds the shared tokens (colors_and_type.css).
// From tiximax-express/apps/express-web that is three levels up.
const repoRoot = path.resolve(dirname, '../../../');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src'),
      // Single source of truth for brand tokens — see docs §3.3 / ADR-5.
      '@tiximax/tokens': path.resolve(repoRoot, 'colors_and_type.css'),
    },
  },
  server: {
    port: 5174,
    // Allow Vite to read the shared token file that lives outside the app root.
    fs: { allow: [repoRoot] },
  },
});

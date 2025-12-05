import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Usar esbuild para minificación (más rápido y ya incluido)
    minify: 'esbuild',
    // Code splitting para mejor caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) {
              return 'react-dom';
            }
            if (id.includes('react-router') || id.includes('@remix-run')) {
              return 'router';
            }
            if (id.includes('@radix-ui')) {
              return 'radix';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('@tanstack')) {
              return 'query';
            }
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'charts';
            }
          }
        },
      },
    },
    // Optimización de chunks
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    sourcemap: false,
    // Optimización adicional
    target: 'esnext',
    modulePreload: {
      polyfill: false,
    },
  },
  // Optimización de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lucide-react'],
  },
  esbuild: {
    // Mejor tree-shaking y eliminar console en prod
    drop: ['console', 'debugger'],
    legalComments: 'none',
  },
}));

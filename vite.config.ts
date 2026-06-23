import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import path from 'node:path'
import type { ViteReactSSGOptions } from 'vite-react-ssg'

interface ConfigWithSSG extends UserConfig {
  ssgOptions?: ViteReactSSGOptions
}

const config: ConfigWithSSG = {
  plugins: [
    react(),
    tailwindcss(),
    compression({ algorithm: 'gzip', ext: '.gz' }),
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 70 },
      svg: {
        multipass: true,
        plugins: [{ name: 'preset-default' }],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'none',
    crittersOptions: {
      preload: 'media',
      pruneSource: false,
    },
    dirStyle: 'nested',
    // React-helmet-async v3 only writes htmlAttributes via client-side side
    // effects (React 19's componentDidMount). During SSG we patch the static
    // `<html lang="...">` per route ourselves so the static HTML carries the
    // correct lang for SEO + screen-readers before hydration runs.
    onPageRendered(route, html) {
      // route is something like "/", "/en", "/th", "/portfolio", "/en/portfolio".
      const seg = route.split('/').filter(Boolean)[0]
      const lang = seg === 'en' || seg === 'zh' ? seg : 'th'
      return html.replace(/<html\s+lang="[a-z-]+"/i, `<html lang="${lang}"`)
    },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('scheduler/')) {
              return 'vendor-react'
            }
            if (id.includes('motion') || id.includes('framer-motion')) {
              return 'vendor-motion'
            }
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'vendor-i18n'
            }
            if (id.includes('react-router')) {
              return 'vendor-router'
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons'
            }
            return 'vendor'
          }
          return undefined
        },
      },
    },
  },
}

export default defineConfig(config)

import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy' 
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    dts({
      include: ['./lib/**/*', 'types.d.ts', 'global.d.ts'],
    }),
    react(),
    viteStaticCopy({
      targets: [
        // { src: './package.json', dest: './' },
        // { src: './README.md', dest: './' },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@easykit/editor': path.resolve(__dirname, './lib/'),
    },
  },
  build: {
    lib: {
      entry: {
        index: './lib/index.ts',
        'locales/en-us': './lib/locales/en-us.ts',
        'locales/zh-cn': './lib/locales/zh-cn.ts',
        'locales/zh-tw': './lib/locales/zh-tw.ts',
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@easykit/design',
        'i18next',
        ...Object.keys(pkg.dependencies || {}).filter((key) => !key.startsWith('@tiptap')),
      ],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
})

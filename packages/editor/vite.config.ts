import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy' 
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      include: [
        "./lib/**/*",
        "types.d.ts",
        "global.d.ts"
      ]
    }),
    react(),
    viteStaticCopy({
      targets: [
        {src: './package.json', dest: './'},
        {src: './README.md', dest: './'}
      ],
    }),
  ],
  resolve: {
    alias: {
      "@easykit/editor": path.resolve(__dirname, "./lib/"),
    }
  },
  build: {
    lib: {
      entry: {
        index: "./lib/index.ts",
        "locales/en-US": "./lib/locales/en-US.ts",
        "locales/zh-CN": "./lib/locales/zh-CN.ts",
        "locales/zh-TW": "./lib/locales/zh-TW.ts",
      },
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@easykit/design",
        "i18next",
        ...Object.keys(pkg.dependencies || {}).filter((key) => !key.startsWith("@tiptap")),
      ],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        globals: {
          "react": "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
  },
})

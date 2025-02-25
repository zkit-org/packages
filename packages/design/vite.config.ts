import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import dts from 'vite-plugin-dts'
import {viteStaticCopy} from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      include: [
        "./lib/**/*",
        "types.d.ts"
      ]
    }),
    react(),
    viteStaticCopy({
      targets: [
        {src: './package.json', dest: './'},
        {src: './README.md', dest: './'},
        {src: './lib/style/globals.css', dest: './'},
      ],
    }),
  ],
  resolve: {
    alias: {
      "@easykit/design": path.resolve(__dirname, "./lib/"),
    }
  },
  build: {
    lib: {
      entry: {
        index: "./lib/index.ts",
        "lib/index": "./lib/lib/index.ts",
        "locales/en-US": "./lib/locales/en-US.ts",
        "locales/zh-CN": "./lib/locales/zh-CN.ts",
        "locales/zh-TW": "./lib/locales/zh-TW.ts",
      },
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "react", "react-dom",
        "react-dom/client",
        "react-dom/server",
        "react/jsx-runtime",
        "@arco-design/web-react",
        "@arco-iconbox/react-atom-ui",
        "dayjs/locale/en",
        "dayjs/locale/zh-cn",
        "date-fns/locale",
        "tailwind-merge", "clsx"
      ],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        globals: {
          "react": "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
          "@arco-design/web-react": "@arco-design/web-react"
        },
      },
    },
  },
})

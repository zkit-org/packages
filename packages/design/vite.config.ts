import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        dts({
            include: [
                "./components/**/*",
                "./lib/**/*",
                "./locales/**/*",
                "index.ts",
                "types.d.ts",
            ]
        }),
        react(),
        viteStaticCopy({
            targets: [
                { src: './package.json', dest: './' },
                { src: './README.md', dest: './' }
            ],
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./"),
        }
    },
    build: {
        lib: {
            entry: {
                index: "./index.ts",
                "locales/en-US": "./locales/en-US.ts",
                "locales/zh-CN": "./locales/zh-CN.ts",
                "lib/index": "./lib/index.ts",
            },
            formats: ["es"]
        },
        rollupOptions: {
            external: [
                "react", "react-dom",
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

import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./"),
        }
    },
    build: {
        lib: {
            // 入口文件将包含可以由你的包的用户导入的导出：
            entry: {
                index: "./index.ts",
                // utils: "./src/utils/index.ts",
            },
            formats: ["es"],
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ["react", "react-dom", "react/jsx-runtime", "@arco-design/web-react", "@arco-iconbox/react-atom-ui"],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
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

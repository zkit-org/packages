import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        dts({
            include: ["./src/**/*"],
        }),
        react()
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./"),
        }
    },
    build: {
        lib: {
            // 入口文件将包含可以由你的包的用户导入的导出：
            entry: {
                index: "./src/index.ts"
            },
            formats: ["es"],
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ["fs-jetpack", "gulp", "path", "chalk", "gulp-replace", "unescape-js"]
        },
    },
})

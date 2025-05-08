import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import dts from 'vite-plugin-dts'
import {viteStaticCopy} from 'vite-plugin-static-copy'
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    dts({
      include: [
        "./src/components/ui/**/*",
        "./src/components/uix/**/*",
        "./src/assets/**/*",
        "./src/lib/**/*",
        "./src/hooks/**/*",
        "./src/index.ts",
        "types.d.ts"
      ]
    }),
    react(),
    viteStaticCopy({
      targets: [
        {src: './README.md', dest: './'},
        {src: './src/assets/style/theme.css', dest: './'},
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/lib/utils": path.resolve(__dirname, "./src/lib/utils"),
      "@easykit/design": path.resolve(__dirname, "./src/"),
    }
  },
  build: {
    lib: {
      entry: {
        index: "./src/index.ts",
        "lib/index": "./src/lib/index.ts",
        "locales/en-US": "./src/assets/locales/en-US.ts",
        "locales/zh-CN": "./src/assets/locales/zh-CN.ts",
        "locales/zh-TW": "./src/assets/locales/zh-TW.ts",
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
        "dayjs/locale/zh-tw",
        "date-fns/locale",
        "tailwind-merge", "clsx",
        "@emotion/react",
        "@hookform/resolvers",
        "@radix-ui/react-alert-dialog",
        "@radix-ui/react-avatar",
        "@radix-ui/react-checkbox",
        "@radix-ui/react-dialog",
        "@radix-ui/react-dismissable-layer",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-focus-scope",
        "@radix-ui/react-hover-card",
        "@radix-ui/react-icons",
        "@radix-ui/react-label",
        "@radix-ui/react-navigation-menu",
        "@radix-ui/react-popover",
        "@radix-ui/react-progress",
        "@radix-ui/react-radio-group",
        "@radix-ui/react-scroll-area",
        "@radix-ui/react-select",
        "@radix-ui/react-separator",
        "@radix-ui/react-slot",
        "@radix-ui/react-switch",
        "@radix-ui/react-tabs",
        "@radix-ui/react-toast",
        "@radix-ui/react-tooltip",
        "@tanstack/react-table",
        "date-fns",
        "lodash",
        "lucide-react",
        "react-day-picker",
        "react-dropzone",
        "react-hook-form",
        "slate",
        "slate-history",
        "slate-react"
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

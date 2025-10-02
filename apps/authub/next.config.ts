import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

export default {
  output: "standalone",
  reactStrictMode: false,
  trailingSlash: false,
  transpilePackages: ["@easykit/design", "@easykit/editor"],
  compiler: {
    removeConsole: !isDev,
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
        ],
        as: "*.js",
      },
    },
  },
} as NextConfig;

import type { Config } from "tailwindcss";
import {tailwindConfig} from "@easykit/design/lib";

const config: Config = {
    ...tailwindConfig,
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [],
};
export default config;

import ta from 'tailwindcss-animate';
import { tailwindConfig } from './lib/lib';
import { Config } from 'tailwindcss';

const config: Config = {
    ...tailwindConfig,
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [
        ta,
    ],
}
export default config

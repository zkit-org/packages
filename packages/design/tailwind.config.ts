import type { Config } from 'tailwindcss';
import ta from 'tailwindcss-animate';
import coreConfig from '@/lib/tailwind';

const config: Config = {
    ...coreConfig,
    content: [
        "./**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [
        ta,
    ],
}
export default config

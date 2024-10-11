import ta from 'tailwindcss-animate';
import { tailwindConfig } from '@/lib/tailwind';

/** @type {import('tailwindcss').Config} */
const config = {
    ...tailwindConfig,
    content: [
        "./**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [
        ta,
    ],
}
export default config

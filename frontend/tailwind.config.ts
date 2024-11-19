import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/_shared/**/*.{js,ts,jsx,tsx,mdx}',
        './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)'
            }
        }
    },
    plugins: [],
    corePlugins: { preflight: false },
    prefix: 'tw-'
};
export default config;

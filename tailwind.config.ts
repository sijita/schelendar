import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            background: '#0E0E11',
            foreground: '#ECEDEE',
            primary: {
              foreground: '#000000',
              DEFAULT: '#BAFF30',
            },
          },
        },
      },
    }),
  ],
} satisfies Config;

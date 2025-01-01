import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // default
        bgDark: '#0f172a', // slate-900
        bgLight: '#FFFFFF', // white
        textLight: '#1F2937', // gray-800
        textDark: '#FFFFFF', // white
        hoverBgLight: '#f1f5f9', // slate-100
        hoverBgDark: '#475569', // slate-600
        // Custom colors
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        primaryContrast: 'var(--color-primary-contrast)',
        background: 'var(--color-background)',
        error: 'var(--color-error)',
        success: 'var(--color-success)',
        // Roles
        admin: '#D4AF37',
        staff: '##1e40af',
        moderador: '#92400e',
        tradutor: '#9d174d',
        revisor: '#86198f',
        editor: '#0284c7',
        parceiro: '#4b5563',
        apoiador: '#065f46',
        user: '#3f6212',
      },
    },
  },
  plugins: [],
};
export default config;

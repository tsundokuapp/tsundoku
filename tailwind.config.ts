import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', 'class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
        Merriweather: ['Merriweather', 'serif'],
      },
      colors: {
        appBackground: 'var(--app-color-background)',
        appHeaderBackground: 'var(--app-color-header-background)',
        appHeaderText: 'var(--app-color-header-text)',
        appHeaderHighlight: 'var(--app-color-header-highlight)',
        appFooterBackground: 'var(--app-color-footer-background)',
        appFooterText: 'var(--app-color-footer-text)',
        appFooterHighlight: 'var(--app-color-footer-highlight)',
        appText: 'var(--app-color-text)',
        appIcon: 'var(--app-color-icon)',
        appTag: 'var(--app-color-tag)',
        appBannerBackground: 'var(--app-color-banner-background)',
        appBannerText: 'var(--app-color-banner-text)',
        appBannerButton: 'var(--app-color-banner-button)',
        appBannerButtonHover: 'var(--app-color-banner-button-hover)',
        appButtonBackground: 'var(--app-color-button-background)',
        appButtonBorder: 'var(--app-color-button-border)',
        appButtonHover: 'var(--app-color-button-hover)',
        appButtonText: 'var(--app-color-button-text)',
        appButtonIcon: 'var(--app-color-button-icon)',
        appButtonOutlineBorder: 'var(--app-color-button-outline-border)',
        appButtonOutlineText: 'var(--app-color-button-outline-text)',
        appButtonFillBackground: 'var(--app-color-button-fill-background)',
        appButtonFillText: 'var(--app-color-button-fill-text)',
        appInputBackground: 'var(--app-color-input-background)',
        appInputPlaceholder: 'var(--app-color-input-placeholder)',
        appInputText: 'var(--app-color-input-text)',
        appInputBorder: 'var(--app-color-input-border)',
        appInputIcon: 'var(--app-color-input-icon)',
        appInputFocus: 'var(--app-color-input-focus)',
        appGroupBackground: 'var(--app-color-group-background)',
        appGroupHover: 'var(--app-color-group-hover)',
        appGroupText: 'var(--app-color-group-text)',
        appListBackground: 'var(--app-color-list-background)',
        appListBorder: 'var(--app-color-list-border)',
        appListHover: 'var(--app-color-list-hover)',
        appListText: 'var(--app-color-list-text)',
        appMenuBackground: 'var(--app-color-menu-background)',
        appMenuBorder: 'var(--app-color-menu-border)',
        appMenuHover: 'var(--app-color-menu-hover)',
        appMenuText: 'var(--app-color-menu-text)',
        appMenuTitle: 'var(--app-color-menu-title)',
        appMenuBreakline: 'var(--app-color-menu-breakline)',
        appSearchBackground: 'var(--app-color-search-background)',
        appSearchPlaceholder: 'var(--app-color-search-placeholder)',
        appSearchText: 'var(--app-color-search-text)',
        appTitle: 'var(--app-color-title)',
        appSubtitle: 'var(--app-color-subtitle)',
        appHighlight: 'var(--app-color-highlight)',
        appHighlightText: 'var(--app-color-highlight-text)',
        bgDark: '#0f172a',
        bgLight: '#FFFFFF',
        textLight: '#1F2937',
        textDark: '#FFFFFF',
        hoverBgLight: '#f1f5f9',
        hoverBgDark: '#475569',
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;

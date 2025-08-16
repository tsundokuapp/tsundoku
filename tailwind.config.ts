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
        appTabsBackground: 'var(--app-color-tabs-background)',
        appTabsText: 'var(--app-color-tabs-text)',
        appTabsActive: 'var(--app-color-tabs-active)',
        appTabsActiveText: 'var(--app-color-tabs-active-text)',

        // Profile Colors
        profileHeaderBgFrom: 'var(--profile-color-header-background-from)',

        profileHeaderBgTo: 'var(--profile-color-header-background-to)',
        profileAvatarBorder: 'var(--profile-color-avatar-border)',
        profileAvatarFallbackBg: 'var(--profile-color-avatar-fallback-bg)',
        profileAvatarFallbackText: 'var(--profile-color-avatar-fallback-text)',
        profileTextPrimary: 'var(--profile-color-text-primary)',
        profileTextSecondary: 'var(--profile-color-text-secondary)',
        profileTextTertiary: 'var(--profile-color-text-tertiary)',
        profileIcon: 'var(--profile-color-icon)',
        profileCardBackground: 'var(--profile-color-card-background)',
        profileCardBorder: 'var(--profile-color-card-border)',
        profileCardHover: 'var(--profile-color-card-hover)',
        profileCardMenuBg: 'var(--profile-color-card-menu-background)',
        profileStatsTotal: 'var(--profile-color-stats-total)',
        profileStatsReading: 'var(--profile-color-stats-reading)',
        profileStatsCompleted: 'var(--profile-color-stats-completed)',
        profileStatsFavorited: 'var(--profile-color-stats-favorited)',
        profileActivityBgFrom: 'var(--profile-color-activity-background-from)',
        profileActivityBgTo: 'var(--profile-color-activity-background-to)',
        profileActivityText: 'var(--profile-color-activity-header-text)',
        profileActivityTextSecondary:
          'var(--profile-color-activity-header-text-secondary)',
        profileActivityIcon: 'var(--profile-color-activity-header-icon)',
        profileReadingBgFrom: 'var(--profile-color-reading-background-from)',
        profileReadingBgTo: 'var(--profile-color-reading-background-to)',
        profileReadingText: 'var(--profile-color-reading-header-text)',
        profileReadingTextSecondary:
          'var(--profile-color-reading-header-text-secondary)',
        profileReadingIcon: 'var(--profile-color-reading-header-icon)',
        profileReadingProgressPrimary:
          'var(--profile-color-reading-progress-primary)',
        profileReadingProgressSecondary:
          'var(--profile-color-reading-progress-secondary)',
        profileFavoritesBgFrom:
          'var(--profile-color-favorites-background-from)',
        profileFavoritesBgTo: 'var(--profile-color-favorites-background-to)',
        profileFavoritesText: 'var(--profile-color-favorites-header-text)',
        profileFavoritesTextSecondary:
          'var(--profile-color-favorites-header-text-secondary)',
        profileFavoritesIcon: 'var(--profile-color-favorites-header-icon)',
        profileAchievementsBgFrom:
          'var(--profile-color-achievements-background-from)',
        profileAchievementsBgTo:
          'var(--profile-color-achievements-background-to)',
        profileAchievementsText:
          'var(--profile-color-achievements-header-text)',
        profileAchievementsTextSecondary:
          'var(--profile-color-achievements-header-text-secondary)',
        profileAchievementsIcon:
          'var(--profile-color-achievements-header-icon)',

        // Achievement Colors
        achievementLegendaryText: 'var(--achievement-color-legendary-text)',
        achievementLegendaryBackground:
          'var(--achievement-color-legendary-background)',
        achievementLegendaryBgFrom:
          'var(--achievement-color-legendary-background-from)',
        achievementLegendaryBgTo:
          'var(--achievement-color-legendary-background-to)',
        achievementEpicText: 'var(--achievement-color-epic-text)',
        achievementEpicBackground: 'var(--achievement-color-epic-background)',
        achievementEpicBgFrom: 'var(--achievement-color-epic-background-from)',
        achievementEpicBgTo: 'var(--achievement-color-epic-background-to)',
        achievementRareText: 'var(--achievement-color-rare-text)',
        achievementRareBackground: 'var(--achievement-color-rare-background)',
        achievementRareBgFrom: 'var(--achievement-color-rare-background-from)',
        achievementRareBgTo: 'var(--achievement-color-rare-background-to)',
        achievementCommonText: 'var(--achievement-color-common-text)',
        achievementCommonBackground:
          'var(--achievement-color-common-background)',
        achievementCommonBgFrom:
          'var(--achievement-color-common-background-from)',
        achievementCommonBgTo: 'var(--achievement-color-common-background-to)',

        // Role Colors
        roleAdmin: 'var(--role-color-admin)',
        roleStaff: 'var(--role-color-staff)',
        roleModerador: 'var(--role-color-moderador)',
        roleTradutor: 'var(--role-color-tradutor)',
        roleRevisor: 'var(--role-color-revisor)',
        roleEditor: 'var(--role-color-editor)',
        roleParceiro: 'var(--role-color-parceiro)',
        roleApoiador: 'var(--role-color-apoiador)',
        roleUser: 'var(--role-color-user)',

        bgDark: '#0f172a',
        bgLight: '#FFFFFF',
        textLight: '#1F2937',
        textDark: '#FFFFFF',
        hoverBgLight: '#f1f5f9',
        hoverBgDark: '#475569',
        admin: '#D4AF37',
        staff: '#1e40af',
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

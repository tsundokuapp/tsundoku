// TODO: mover esses valores para um arquivo de configuração do tema

const sizes = {
  EXTRA_MOBILE: 480,
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
};

export const BREAKING_POINTS = {
  EXTRA_MOBILE: `(max-width: ${sizes.EXTRA_MOBILE}px)`,
  MOBILE: `(max-width: ${sizes.MOBILE}px)`,
  // mobileM: `(min-width: ${sizes.mobileM})`,
  // mobileL: `(min-width: ${sizes.mobileL})`,
  TABLET: `(max-width: ${sizes.TABLET}px)`,
  // laptop: `(min-width: ${sizes.laptop})`,
  // laptopL: `(min-width: ${sizes.laptopL})`,
  DESKTOP: `(max-width: ${sizes.DESKTOP}px)`,
};

export const SIZES_RAW = {
  EXTRA_MOBILE: sizes.EXTRA_MOBILE,
  MOBILE: sizes.MOBILE,
  TABLET: sizes.TABLET,
  DESKTOP: sizes.DESKTOP,
};

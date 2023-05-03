// TODO: mover esses valores para um arquivo de configuração do tema

const sizes = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
};

export const BREAKING_POINTS = {
  MOBILE: `(max-width: ${sizes.MOBILE}px)`,
  // mobileM: `(min-width: ${sizes.mobileM})`,
  // mobileL: `(min-width: ${sizes.mobileL})`,
  tablet: `(max-width: ${sizes.TABLET}px)`,
  // laptop: `(min-width: ${sizes.laptop})`,
  // laptopL: `(min-width: ${sizes.laptopL})`,
  DESKTOP: `(max-width: ${sizes.DESKTOP}px)`,
};

export const SIZES_RAW = {
  MOBILE: sizes.MOBILE,
  TABLET: sizes.TABLET,
  DESKTOP: sizes.DESKTOP,
};

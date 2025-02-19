export const convertSlugToText = (slug: string, capitalize = true) => {
  // Converte slug para texto normal e capitaliza a primeira letra de todas as palavras
  return capitalize
    ? slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : slug.replace(/-/g, ' ');
};

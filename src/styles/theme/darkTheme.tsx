import { DefaultTheme } from 'styled-components';

const baseDark = {
  background: '#23272A',
  boxshadow: '0px 5px 10px rgba(0, 0, 0, 0.5)',
  border: '0.25rem solid #23272a',
};

export const defaultTheme: DefaultTheme = {
  name: 'dark',
  borderRadius: '0.25rem',
  bodyColor: baseDark.background,
  textColor: '#ffffff',

  // * Componentes
  borda: baseDark.border,
  sombra: baseDark.boxshadow,

  // * Cores informativas
  sucesso: '#2ba84a',
  informacao: '#ffd819',
  aviso: '#e35053',

  // * Cores do tema
  // TODO: verificar se mantém "palette" ou "colors"
  // TODO: ajustar cores do tema, e verificar contraste das fontes
  palette: {
    common: {
      black: '#121212',
      white: '#ffffff',
    },
    primary: {
      main: baseDark.background,
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#259CC1',
      contrastText: '#ffffff',
    },
    tertiary: {
      main: '#343a40',
      contrastText: '#ffffff',
    },
    quaternary: {
      main: '#202225',
      contrastText: '#ffffff',
    },
  },
};

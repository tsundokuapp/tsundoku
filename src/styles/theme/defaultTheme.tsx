import { DefaultTheme } from 'styled-components';
// * DefaultTheme é o LightTheme
const baseLight = {
  background: '#F8F8FF',
  boxshadow: '0px 5px 10px rgba(69, 89, 116, 0.3)',
  border: '0.25rem solid #EAF9FC',
};

export const defaultTheme: DefaultTheme = {
  name: 'default',
  borderRadius: '0.25rem',
  bodyColor: baseLight.background,
  textColor: '#000000',

  // * Componentes
  borda: baseLight.border,
  sombra: baseLight.boxshadow,

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
      main: baseLight.background,
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#65DAFF',
      contrastText: '#ffffff',
    },
    tertiary: {
      main: '#e1ecf7',
      contrastText: '#ffffff',
    },
    quaternary: {
      main: '#63ADF2',
      contrastText: '#ffffff',
    },
  },
};

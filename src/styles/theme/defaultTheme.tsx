import { DefaultTheme } from 'styled-components';
// * DefaultTheme é o LightTheme
const baseLight = {
  background: '#F8F8FF',
  boxshadow: '0px 5px 10px rgba(69, 89, 116, 0.3)',
  border: '0.25rem solid #EAF9FC',
};

export const defaultTheme: DefaultTheme = {
  name: 'default',
  icon: undefined,
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
  backgroundSec: '#3C4148',

  // * Tamanhos
  espacamento: '1rem',
  espacamentoMenor: '0.5rem',
  espacamentoMaior: '1.5rem',

  titulo: '2.5rem',
  subtitulo: '2rem',
  texto: '1rem',

  bordaPadrao: '0.25rem',

  // * Cores do tema
  palette: {
    common: {
      black: '#121212',
      white: '#ffffff',
    },
    primary: {
      main: baseLight.background,
      text: '#ffffff',
    },
    secondary: {
      main: '#65DAFF',
      text: '#ffffff',
    },
    tertiary: {
      main: '#e1ecf7',
      text: '#ffffff',
    },
    quaternary: {
      main: '#63ADF2',
      text: '#ffffff',
    },
  },
  title: null,
  colors: {
    primaria: null,
    secundaria: null,
    terciaria: null,
    quartiaria: null,
    quintiaria: null,
    branca: null,
    sombra: null,
    borda: null,
    sucesso: null,
    informacao: null,
    aviso: null,
  },
};

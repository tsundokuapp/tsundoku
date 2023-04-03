import { DefaultTheme } from 'styled-components';

const baseDark = {
  background: '#23272A',
  boxshadow: '0px 5px 10px rgba(0, 0, 0, 0.5)',
  border: '0.25rem solid #23272a',
};

export const darkTheme: DefaultTheme = {
  name: 'dark',
  icon: undefined,
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
      main: baseDark.background,
      text: '#ffffff',
    },
    secondary: {
      main: '#259CC1',
      text: '#ffffff',
    },
    tertiary: {
      main: '#343a40',
      text: '#ffffff',
    },
    quaternary: {
      main: '#202225',
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

import { DefaultTheme } from 'styled-components';
import { MdMoon } from 'react-icons/md';

export const darkTheme: DefaultTheme = {
  name: 'dark',
  icon: MdMoon,

  colors: {
    primaria: '#23272A',
    secundaria: '#2C2F33',
    terciaria: '#36393F',
    bg: '#2C2F33',
    bgComponente: '#36393F',
    texto: '#FFFFFF',
    textoSecundario: '#8E9297',
    alerta: '#E84D4D',
    alertaHover: '#E84D4D',
    sucesso: '#43B581',
    sucessoHover: '#43B581',
    info: '#7289DA',
    infoHover: '#7289DA',
    borda: '#2C2F33',
    sombra: '#2C2F33',
    textoBotao: '#FFFFFF',
    textoBotaoSecundario: '#FFFFFF',
  },

  elementos: {
    borda: '0.25rem solid #23272a',
    sombra: '0px 5px 10px rgba(0, 0, 0, 0.5)',
  },

  tamanhos: {
    radiusPequena: '0.25rem',
    radiusNormal: '0.5rem',
    radiusGrande: '1rem',
  },

  paddings: {
    pageTop: '5rem',
    pequeno: '1rem',
    medio: '1.5rem',
    grande: '2rem',
  },

  margins: {
    pageTop: '5rem',
    pequeno: '1rem',
    medio: '1.5rem',
    grande: '2rem',
  },

  texto: {
    titulo: '2.5rem',
    subtitulo: '2rem',
    paragrafo: '1rem',
  },

  title: null,
};

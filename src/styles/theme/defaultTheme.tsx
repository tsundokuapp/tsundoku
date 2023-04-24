import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  name: "default",
  icon: undefined,

  espacamento: {
    semEspacamento: "0rem",
    pequeno: "0.25rem",
    medio: "0.5rem",
    grande: "0.75rem",
    extraGrande: "1rem",
  },

  texto: {
    titulo: "1.5rem",
    subtitulo: "1.25rem",
    paragrafo: "1rem",
    nota: "0.75rem",
  },

  quina: {
    semQuina: "0rem",
    pequena: "0.25rem",
    media: "0.5rem",
    grande: "0.75rem",
    extraGrande: "1rem",
    redonda: "999rem",
  },

  borda: {
    semBorda: "0rem",
    pequena: "0.031rem",
    media: "0.062rem",
    grande: "0.093rem",
    extraGrande: "0.125rem",
  },

  colors: {
    primaria: {
      300: "#54BDE3",
      400: "#37A7CD",
      500: "#259CC1",
      600: "#007DA1",
      700: "#00698C",
      default: "#259CC1",
    },
    background: "#121214",
    text: "#E1E1E6",
    textSec: "#8D8D99",
    bgComponente: "#202024",
    contraste: "#3E3E45",

    especial: {
      branco: "#FFFFFF",
      preto: "#000000",
      textBusca: "#6C757D",
      bgBusca: "#CED4DA",
    },

    feedback: {
      sucesso: {
        300: "#80F075",
        400: "#55EB47",
        500: "#2BE51A",
        600: "#22B814",
        700: "#1A8A0F",
        default: "#2BE51A",
      },
      aviso: {
        300: "#FFB266",
        400: "#FF9933",
        500: "#FF8000",
        600: "#CC6600",
        700: "#994D00",
        default: "#FF8000",
      },
      perigo: {
        300: "#FF6666",
        400: "#FF3333",
        500: "#FF0000",
        600: "#CC0000",
        700: "#990000",
        default: "#FF0000",
      },
    },
  },
  title: null,
};

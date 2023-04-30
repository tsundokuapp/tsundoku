import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    icon: {
      darkIcon: unknown;
      lightIcon: unknown;
    };

    espacamento: {
      semEspacamento: string;
      pequeno: string;
      medio: string;
      grande: string;
      extraGrande: string;
    };

    texto: {
      titulo: string;
      subtitulo: string;
      paragrafo: string;
      nota: string;
    };

    quina: {
      semQuina: string;
      pequena: string;
      media: string;
      grande: string;
      extraGrande: string;
      redonda: string;
    };

    borda: {
      semBorda: string;
      pequena: string;
      media: string;
      grande: string;
      extraGrande: string;
    };

    colors: {
      primaria: {
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        default: string;
      };

      background: string;
      text: string;
      textSec: string;
      bgComponente: string;
      contraste: string;

      especial: {
        branco: string;
        preto: string;
        textBusca: string;
        bgBusca: string;
      };

      feedback: {
        sucesso: {
          300: string;
          400: string;
          500: string;
          600: string;
          700: string;
          default: string;
        };

        aviso: {
          300: string;
          400: string;
          500: string;
          600: string;
          700: string;
          default: string;
        };

        perigo: {
          300: string;
          400: string;
          500: string;
          600: string;
          700: string;
          default: string;
        };
      };
    };
  }
}

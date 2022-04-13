import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      primaria: string;
      secundaria: string;
      terciaria: string;
      quartiaria: string;

      branca: string;
      sombra: string;
      borda: string;

      sucesso: string;
      informacao: string;
      aviso: string;
    };
  }

  export interface CustomTheme {
    title: string;

    colors: {
      primaria: string;
      secundaria: string;
      terciaria: string;
      quartiaria: string;

      branca: string;
      sombra: string;
      borda: string;

      sucesso: string;
      informacao: string;
      aviso: string;
    };
  }
}

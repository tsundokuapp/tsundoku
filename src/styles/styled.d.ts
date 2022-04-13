import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string | null;

    colors: {
      primaria: string | null;
      secundaria: string | null;
      terciaria: string | null;
      quartiaria: string | null;

      branca: string | null;
      sombra: string | null;
      borda: string | null;

      sucesso: string | null;
      informacao: string | null;
      aviso: string | null;
    };
  }

  export interface CustomTheme {
    title: string | null;

    colors: {
      primaria: string | null;
      secundaria: string | null;
      terciaria: string | null;
      quartiaria: string | null;

      branca: string | null;
      sombra: string | null;
      borda: string | null;

      sucesso: string | null;
      informacao: string | null;
      aviso: string | null;
    };
  }
}

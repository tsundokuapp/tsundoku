import 'styled-components';
interface IPalette {
  main: string;
  text: string;
}

// * Alterando o tema default porque ele não está aceitando o extends
// TODO: tirar esse comentário no futuro
declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    icon: unknown;
    borderRadius: string;
    bodyColor: string;
    textColor: string;

    // * Componentes
    borda: string;
    sombra: string;

    // * Cores informativas
    sucesso: string;
    informacao: string;
    aviso: string;
    backgroundSec: string;

    // * Medidas padrão
    espacamento: string;
    espacamentoMenor: string;
    espacamentoMaior: string;

    titulo: string;
    subtitulo: string;
    texto: string;

    bordaPadrao: string;

    palette: {
      common: {
        black: string;
        white: string;
      };
      primary: IPalette;
      secondary: IPalette;
      tertiary: IPalette;
      quaternary: IPalette;
    };
  }
}

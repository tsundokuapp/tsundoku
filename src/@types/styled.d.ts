import 'styled-components';
interface IPalette {
  main: string;
  contrastText: string;
}

// * Alterando o tema default porque ele não está aceitando o extends
// TODO: tirar esse comentário no futuro
declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    // ! Esse unknown não deveria está aqui, mas não quero atrelar o @material-ui neste projeto
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

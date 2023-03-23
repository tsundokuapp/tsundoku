import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
// TODO: usando dark theme como padrão, mas será alterado para light
import { defaultTheme } from '../styles/theme/darkTheme';
// import { useLocalStorage } from "usehooks-ts";
import { GlobalStyle } from '../styles/globals';

export default function App({ Component, pageProps }: AppProps) {
  // TODO: verificar se o tema vai ser alterado via localStorage ou DB
  // !persiste o tema no localStorage, node 16.14 não suporta
  // const [theme] = useLocalStorage("theme", defaultTheme);
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

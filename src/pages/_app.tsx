import type { AppProps } from "next/app";
import { CustomThemeProvider } from "@/hooks/useThemeContext";
// import { useLocalStorage } from "usehooks-ts";
import { GlobalStyle } from "@/styles/globals";
import { Navbar } from "@/components/Heading/Navbar";
import { useMounted } from "@/hooks/useMounted";
import NotificationProvider from "@/Context/NotificationProvider";

import { useRouter } from "next/router";
import ModalProvider from "@/Context/ContextModal";

export default function App({ Component, pageProps }: AppProps) {
  // TODO: verificar se o tema vai ser alterado via localStorage ou DB
  // !as alterações para salvar devem ser feitas no hook useThemeContext.tsx
  // !persiste o tema no localStorage, node 16.14 não suporta
  // const [theme] = useLocalStorage("theme", defaultTheme);

  const router = useRouter();
  const isAdmin = router.pathname.includes("/admin");

  const hasMounted = useMounted();
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <CustomThemeProvider>
        <NotificationProvider>
          <ModalProvider>
            <GlobalStyle />
            {isAdmin ? null : <Navbar />}
            <Component {...pageProps} />
          </ModalProvider>
        </NotificationProvider>
      </CustomThemeProvider>
    </>
  );
}

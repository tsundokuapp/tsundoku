import React, { useState } from "react";
import Head from "next/head";

import Navbar from "../components/NavBar";
import { Container } from "../styles/pages/home";

import { DefaultTheme, ThemeProvider } from "styled-components";

import { combineTheme, dark } from "../styles/themes";

import { Brightness3, Brightness6, Brightness7} from "@material-ui/icons";

const Home: React.FC = () => {
    const [theme, setTheme] = useState<DefaultTheme>(combineTheme(dark));

  const opcoes = [
    {
      indiceTema: "dark",
      icone: <Brightness3 />,
    },
    {
      indiceTema: "light",
      icone: <Brightness7 />,
    },
    {
      indiceTema: "sepia",
      icone: <Brightness6 />,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Head>
          <title>Tsundoku Traduções</title>
        </Head>
        <Navbar tema={theme.title} opcoes={opcoes} setTheme={setTheme} />
        <h1>Home</h1>
      </Container>
    </ThemeProvider>
  );
};

export default Home;

import Link from "next/link";
import React, { useState, Dispatch, SetStateAction } from "react";

import LogoTema from "components/LogoTema";
import DropDownTemas from "components/DropDownTemas";
import DropDownAcesso from "components/DropDownAcesso";

import { DefaultTheme } from "styled-components";
import { Container } from "./styles";

import { Brightness3 } from "@material-ui/icons";

interface INavbarProps {
  tema: string;
  opcoes: { indiceTema: string; icone: JSX.Element }[];
  setTheme: Dispatch<SetStateAction<DefaultTheme>>;
}

const Navbar: React.FC<INavbarProps> = ({ tema, opcoes, setTheme }) => {
  const [temaSelecionado, setTemaSelecionado] = useState(<Brightness3 />);

  return (
    <Container>
      <Link href="/">
        <a>
          <LogoTema tema={tema} />
        </a>
      </Link>
      <DropDownTemas
        opcoes={opcoes}
        temaSelecionado={temaSelecionado}
        setTemaSelecionado={setTemaSelecionado}
        setTheme={setTheme}
      />
      <DropDownAcesso />
    </Container>
  );
};

export default Navbar;

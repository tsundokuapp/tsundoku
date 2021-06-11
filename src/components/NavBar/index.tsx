import React, { useState, Dispatch, SetStateAction } from "react";
import { Container } from "./styles";
import LogoTema from "components/LogoTema";
import DropDownTemas from "components/DropDownTemas";
import { Brightness2 } from "@material-ui/icons";
import { DefaultTheme } from "styled-components";

interface INavbarProps {
  tema: string;
  opcoes: { indiceTema: string; icone: JSX.Element }[];
  setTheme: Dispatch<SetStateAction<DefaultTheme>>;
}

const Navbar: React.FC<INavbarProps> = ({ tema, opcoes, setTheme }) => {
  const [temaSelecionado, setTemaSelecionado] = useState(<Brightness2 />);

  return (
    <Container>
      <LogoTema tema={tema} />
      <DropDownTemas
        opcoes={opcoes}
        temaSelecionado={temaSelecionado}
        setTemaSelecionado={setTemaSelecionado}
        setTheme={setTheme}
      />
      <h2>Login</h2>
    </Container>
  );
};

export default Navbar;

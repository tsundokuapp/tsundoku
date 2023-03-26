import Link from "next/link";
import React, { useState, Dispatch, SetStateAction } from "react";
import Container, {
  ContainerNav,
  BotaoMenu,
  BotaoSair,
} from "components/MainHeader/styles";
import DropDownTemas from "components/DropDownTemas";
import { DefaultTheme } from "styled-components";
import { Brightness3 } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";

interface IMainHeader {  
  opcoes: { indiceTema: string; icone: JSX.Element }[];
  setTheme: Dispatch<SetStateAction<DefaultTheme>>;
  setMenu:  Dispatch<SetStateAction<boolean>>;
}

const MainHeader = ({ opcoes, setTheme, setMenu }: IMainHeader) => {
  const [temaSelecionado, setTemaSelecionado] = useState(<Brightness3 />);
  const [menuAtivo, setMenuAtivo] = useState(true);

  const tiraMenu = () => {    
    setMenuAtivo(!menuAtivo);
    setMenu(!menuAtivo);
  }

  return (
    <Container>
      <BotaoMenu onClick={tiraMenu} >
        <MenuIcon />
      </BotaoMenu>
      Bem-vindo(a) ao Painel de Controle!
      <ContainerNav>
        <DropDownTemas
          opcoes={opcoes}
          temaSelecionado={temaSelecionado}
          setTemaSelecionado={setTemaSelecionado}
          setTheme={setTheme}
        />
        <BotaoSair>
          <ExitToAppRoundedIcon fontSize="small" />
          <Link href="/">Sair!</Link>
        </BotaoSair>
      </ContainerNav>
    </Container>
  );
};

export default MainHeader;

import Link from "next/link";
import React, { useState, Dispatch, SetStateAction } from "react";
import Container, {
  ContainerNav,
  BotaoMenu,
  BotaoSair,
} from "./styles";

import { Dropdown } from "@/components/Heading/Dropdown/style";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";

interface IMainHeader {  
  setMenu:  Dispatch<SetStateAction<boolean>>;
}

const MainHeader = ({ setMenu }: IMainHeader) => {  
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
        <Dropdown />
        <BotaoSair>
          <ExitToAppRoundedIcon fontSize="small" />
          <Link href="/">Sair!</Link>
        </BotaoSair>
      </ContainerNav>
    </Container>
  );
};

export default MainHeader;

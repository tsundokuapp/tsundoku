import Link from "next/link";
import React, { useState, Dispatch, SetStateAction } from "react";
import Container, {
  ContainerNav,
  BotaoMenu,
  BotaoSair,
} from "./styles";

import { Dropdown } from "@/components/Heading/Dropdown/style";


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
        <span>Tira menu</span>
      </BotaoMenu>
      Bem-vindo(a) ao Painel de Controle!
      <ContainerNav>       
        <Dropdown />
        <BotaoSair>          
          <Link href="/">Sair!</Link>
        </BotaoSair>
      </ContainerNav>
    </Container>
  );
};

export default MainHeader;

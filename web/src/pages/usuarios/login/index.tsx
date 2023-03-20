import Link from "next/link";
import React from "react";
import imagemFundo from "../../../../public/assets/img/backgrounds/SlimeAzul.png";
import Container, {  ContainerLogo, InputLogin, InputSenha, ContainerForm, ContainerImagemLogo, InputSubmit, InputBotaoPaginaInicial} from "./style";

import LogoDark from "../../../../public/assets/img/logoTemaDark.svg";


const TelaLogin: React.FC = () => {
  return (
    <Container imagemFundo={imagemFundo}>
      <ContainerLogo>
       <ContainerImagemLogo src={LogoDark} alt="Logo Branca"/>
      </ContainerLogo>
      <ContainerForm>
        <InputLogin placeholder="Usuário" />
        <InputSenha placeholder="Senha" />
        <InputSubmit value="Login" />
        <InputBotaoPaginaInicial>
            <Link href="/">
                <a>Voltar para página inicial</a>
            </Link>
        </InputBotaoPaginaInicial>
      </ContainerForm>
    </Container>
  );
};

export default TelaLogin;

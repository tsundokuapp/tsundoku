import Link from "next/link";
import React from "react";
//import imagemFundo from "assets/img/backgrounds/SlimeRosa.png";
import imagemFundo from "assets/img/backgrounds/SlimeRoxo.png";

import Container, {ContainerLogo, InputLogin, InputEmail, InputSenha, ContainerForm, ContainerImagemLogo, InputSubmit, InputBotaoPaginaInicial} from "./style";

import LogoSepia from "assets/img/logoTemaSepia.svg";


const TelaLogin: React.FC = () => {
  return (
    <Container imagemFundo={imagemFundo}>
      <ContainerLogo>
       <ContainerImagemLogo src={LogoSepia} alt="Logo Vermelha"/>
      </ContainerLogo>
      <ContainerForm>
        <InputEmail placeholder="E-mail" />
        <InputLogin placeholder="Usuário" />
        <InputSenha placeholder="Senha" />
        <InputSenha placeholder="Confirme sua senha" />
        <InputSubmit value="Cadastrar" />
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

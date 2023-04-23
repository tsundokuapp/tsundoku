import Link from "next/link";
import Container, {
  ContainerLogo,
  InputLogin,
  InputEmail,
  InputSenha,
  ContainerForm,
  ContainerImagemLogo,
  InputSubmit,
  InputBotaoPaginaInicial,
} from "./styles";

import LogoSepia from "@/assets/img/temaSepia.svg";
// ! Next importa as imagens como StaticImageData e não como string;
// import imagemFundo from '@/assets/img/backgrounds/SlimeRoxo.png';
// TODO: refatorar esse código
// TODO: fazer a imagem de fundo ser dinâmica

const TelaLogin = () => {
  return (
    <Container imagemFundo={"@/assets/img/backgrounds/SlimeRoxo.png"}>
      <ContainerLogo>
        <ContainerImagemLogo src={LogoSepia} alt="Logo Vermelha" />
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

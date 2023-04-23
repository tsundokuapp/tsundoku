import Link from "next/link";
import Container, {
  ContainerLogo,
  InputLogin,
  InputSenha,
  ContainerForm,
  ContainerImagemLogo,
  InputSubmit,
  InputBotaoPaginaInicial,
} from "./style";

import LogoDark from "@/assets/img/temaDark.svg";
// ! next importa as imagens como StaticImageData e não como string;
// import imagemFundo from '@/assets/img/backgrounds/SlimeAzul.png';
// TODO: refatorar esse código
// TODO: fazer a imagem de fundo ser dinâmica

const TelaLogin = () => {
  return (
    <Container imagemFundo={"@/assets/img/backgrounds/SlimeAzul.png"}>
      <ContainerLogo>
        <ContainerImagemLogo src={LogoDark} alt="Logo Branca" />
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

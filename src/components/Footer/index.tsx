import { Container, SocialMidia } from "./styles";
import { FiTwitter, FiFacebook, FiMail } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";

export const Footer = () => {
  return (
    <Container>
      <strong>Tsundoku Traduções</strong>
      <SocialMidia>
        <a href="https://twitter.com/tsuntraducoes">
          <FiTwitter />
        </a>
        <a href="https://www.facebook.com/tsundokutraducoes">
          <FiFacebook />
        </a>
        <a href="https://www.facebook.com/tsundokutraducoes">
          <FaDiscord />
        </a>
        <a href="tsundokutraducoes@gmail.com">
          <FiMail />
        </a>
      </SocialMidia>
      <p>© 2023 Tsundoku Traduções</p>

      <p>Desenvolvido pela equipe Tsundoku</p>
    </Container>
  );
};

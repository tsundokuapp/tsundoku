import Image, { StaticImageData } from "next/image";
import { Container, ContainerImageAvatar } from "./styles";

interface IAvatar {
  image: StaticImageData;
  user: string;
  retractMenuAdmin?: Boolean;
}

export default function Avatar({ image, user, retractMenuAdmin }: IAvatar) {
  return (
    <Container>
      <ContainerImageAvatar retractMenuAdmin={retractMenuAdmin === true}>
        <Image alt="Imagem Perfil" src={image} />
      </ContainerImageAvatar>
      <span>{user}</span>
    </Container>
  );
}

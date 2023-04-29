import Image, { StaticImageData } from "next/image";
import { Container, ContainerImageAvatar } from "./styles";

interface IAvatar{
  image: StaticImageData;
  user: string;
  retractMenuAdmin?: Boolean
}

export default function Avatar({image, user, retractMenuAdmin}: IAvatar){
  console.log(retractMenuAdmin)
  return (
    
    <Container>
      <ContainerImageAvatar retractMenuAdmin={retractMenuAdmin === true ? true : false}>
        
        <Image alt="Imagem Perfil" src={image} />
      </ContainerImageAvatar>
      <span>{user}</span>
    </Container>
  );
};
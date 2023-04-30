import Image, { StaticImageData } from "next/image";
import { Container, Shadow, Title } from "./styles";

import Link from "next/link";

interface ICardBlogProps {
  capa: StaticImageData | string;
  titulo: string;
  href: string;
}

const larguraPadrao = 320;

export const CardBlog = ({ capa, titulo, href }: ICardBlogProps) => {
  return (
    <Link href={href}>
      <Container>
        <Image
          src={capa}
          alt="capa do volume"
          height={larguraPadrao}
          width={larguraPadrao}
        />
        <Shadow>
          <Title>{titulo}</Title>
        </Shadow>
      </Container>
    </Link>
  );
};

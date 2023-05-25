import Link from "next/link";

import { Container, Shadow, Title } from "./styles";

interface ICardBlogProps {
  cover: string;
  title: string;
  href: string;
}

export const CardBlog = ({ cover, title, href }: ICardBlogProps) => {
  return (
    <Link href={href}>
      <Container>
        <img src={cover} alt="capa do volume" />
        <Shadow>
          <Title>{title}</Title>
        </Shadow>
      </Container>
    </Link>
  );
};

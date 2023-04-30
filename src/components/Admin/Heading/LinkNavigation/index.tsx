import Link from "next/link";
import { Container } from "./styles";

interface ILinkNavigation {
  title: string;
  url: string;
  icon: any;
}

export const LinkNavigation = ({ title, url, icon }: ILinkNavigation) => {
  const isPreviusPage = title === "Voltar";

  return (
    <Container title={title} isPreviusPage={isPreviusPage}>
      <Link href={url}>
        <>{icon}</>
      </Link>
    </Container>
  );
};

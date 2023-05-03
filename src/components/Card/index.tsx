import {
  Container,
  ContainerInfo,
  HeaderCardInfo,
  TituloCard,
  BodyCardInfo,
} from "./styles";

import { useState } from "react";
import Link from "next/link";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import { Button } from "../Button";

// TODO: alterar StaticImageData para string quando terminar os testes
interface ICardProps {
  capa: string;
  titulo: string;
  autor: string;
  volume: string;
  href: string;
}

export const Card = ({ capa, titulo, autor, volume, href }: ICardProps) => {
  const [favoritado, setFavoritado] = useState(false);

  const adicionaFavorito = () => {
    setFavoritado(!favoritado);
  };
  return (
    <Link href={href}>
      <Container>
        <img src={capa} alt="capa do volume" />

        <ContainerInfo>
          <HeaderCardInfo>
            <TituloCard>{titulo}</TituloCard>
            <button onClick={adicionaFavorito}>
              {favoritado ? <BsBookmarkCheckFill /> : <BsBookmark />}
            </button>
          </HeaderCardInfo>
          <BodyCardInfo>
            <span>
              <p>Autor: </p> <p>{autor}</p>
            </span>
            <span>
              <p>Volume: </p> <p>{volume}</p>
            </span>
            <Button label="Capítulo 07" variant="primaria" />
          </BodyCardInfo>
        </ContainerInfo>
      </Container>
    </Link>
  );
};

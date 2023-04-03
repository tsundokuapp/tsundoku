import Image, { StaticImageData } from 'next/image';
import {
  ContainerCard,
  ContainerInfo,
  HeaderCardInfo,
  TituloCard,
  BodyCardInfo,
  ButtonCard,
} from './styles';

import { BsBookmark, BsBookmarkCheckFill } from 'react-icons/bs';
import { useState } from 'react';

// TODO: alterar StaticImageData para string quando terminar os testes
interface ICardProps {
  capa: StaticImageData;
  titulo: string;
  genero: string[];
  volume: string;
}

const larguraPadrao = 180;

export const Card = ({ capa, titulo, genero, volume }: ICardProps) => {
  const [favoritado, setFavoritado] = useState(false);

  const adicionaFavorito = () => {
    setFavoritado(!favoritado);
  };
  return (
    <ContainerCard>
      <Image
        src={capa}
        alt="capa do volume"
        height={larguraPadrao * 1.5}
        width={larguraPadrao}
      />
      <ContainerInfo>
        <HeaderCardInfo>
          <TituloCard>{titulo}</TituloCard>
          <button onClick={adicionaFavorito}>
            {favoritado ? <BsBookmarkCheckFill /> : <BsBookmark />}
          </button>
        </HeaderCardInfo>
        <BodyCardInfo>
          <span>
            <p>Gênero: </p> <p>{`${genero[0]}, ${genero[1]}, Suspense`}</p>
          </span>
          <span>
            <p>Volume: </p> <p>{volume}</p>
          </span>
          <ButtonCard>Comece a ler!</ButtonCard>
        </BodyCardInfo>
      </ContainerInfo>
    </ContainerCard>
  );
};

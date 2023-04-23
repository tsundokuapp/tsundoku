import Image, { StaticImageData } from 'next/image';
import {
  ContainerCard,
  ContainerInfo,
  HeaderCardInfo,
  TituloCard,
  BodyCardInfo,
} from './styles';

import { BsBookmark, BsBookmarkCheckFill } from 'react-icons/bs';
import { useState } from 'react';
import { TsunBotao } from '../Botao';

// TODO: alterar StaticImageData para string quando terminar os testes
interface ICardProps {
  capa: StaticImageData;
  titulo: string;
  autor: string;
  volume: string;
}

const larguraPadrao = 180;

export const Card = ({ capa, titulo, autor, volume }: ICardProps) => {
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
            <p>Autor: </p> <p>{autor}</p>
          </span>
          <span>
            <p>Volume: </p> <p>{volume}</p>
          </span>
          <TsunBotao titulo="Capítulo 07" variante="primaria" />
        </BodyCardInfo>
      </ContainerInfo>
    </ContainerCard>
  );
};

import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "../Button";

import {
  Container,
  ContainerInfo,
  HeaderCardInfo,
  CardTitle,
  BodyCardInfo,
} from "./styles";

// import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";

// TODO: alterar StaticImageData para string quando terminar os testes
interface ICardProps {
  capa: string;
  titulo: string;
  autor: string;
  volume: string;
  href: string;
}

export const Card = ({ capa, titulo, autor, volume, href }: ICardProps) => {
  // Isso será adicionado no futuro
  // const [favoritado, setFavoritado] = useState(false);

  // const adicionaFavorito = () => {
  //   setFavoritado(!favoritado);
  // };
  const router = useRouter();

  const chapterPath = "/novels/bruxa-errante/capitulo-01";

  return (
    <Container>
      <Link href={href}>
        <img src={capa} alt="capa do volume" />
      </Link>

      <ContainerInfo>
        <HeaderCardInfo>
          <CardTitle>{titulo}</CardTitle>
          {/* <button onClick={adicionaFavorito}>
              {favoritado ? <BsBookmarkCheckFill /> : <BsBookmark />}
            </button> */}
        </HeaderCardInfo>
        <BodyCardInfo>
          <span>
            <p>Autor: </p> <p>{autor}</p>
          </span>
          <span>
            <p>Volume: </p> <p>{volume}</p>
          </span>
          <Button
            label="Capítulo 07"
            variant="primaria"
            onClick={() => router.push(chapterPath)}
          />
        </BodyCardInfo>
      </ContainerInfo>
    </Container>
  );
};

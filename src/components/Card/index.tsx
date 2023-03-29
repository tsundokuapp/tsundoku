import Image, { StaticImageData } from 'next/image';
import { ContainerCard, ContainerInfo } from './styles';

// TODO: alterar StaticImageData para string quando terminar os testes
interface ICardProps {
  capa: StaticImageData;
  titulo: string;
  genero: string[];
  volume: string;
}

export const Card = ({ capa, titulo , genero, volume}: ICardProps) => {
  
  return (
    <ContainerCard>
				<Image
          src={capa}
          alt="capa do volume"
          // ! Não alterar o aspect ratio => 1.5:1
          height={270}
          width={180}
        />
        <ContainerInfo>
            <strong>
              {titulo}
            </strong>
            <div>
								<span>Gênero: </span> <p>{`${genero[0]}, ${genero[1]}`}</p>
                <span>Volume: </span> <p>{volume}</p>
            </div>
        </ContainerInfo>
    </ContainerCard>
  );
};

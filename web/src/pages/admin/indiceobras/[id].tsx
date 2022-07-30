import Link from "next/link";
import React from "react";
import LayoutDashBoard from 'components/LayoutDashBoard';
import Container, { SecaoTitulo, SecaoIndiceCapitulos, BotaoAlteracao, SecaoBotoesAdicao} from "./styles";
import Acordeon from "components/AcordeonCapitulosDashboard";
import * as ROTAS from "constants/rotas";
import mushoku from '../../../../public/assets/img/backgroudscard/MushokuTensei.png';

const volumes = [
  {
    indice: "01",
    titulo: "Volume 01",
    sinopse: "<p>Texto da Sinopse</p>",
    capaVolume: mushoku,
    capitulos: [
      "Capítulo 01",
      "Capítulo 02",
      "Capítulo 03",
      "Capítulo 04",
      "Capítulo 05",
      "Capítulo 01",
      "Capítulo 02",
      "Capítulo 03",
      "Capítulo 04",
      "Capítulo 05",
      "Capítulo 01",
      "Capítulo 02",
      "Capítulo 03",
      "Capítulo 04",
      "Capítulo 05",
    ],
  },
  {
    indice: "02",
    titulo: "Volume 02",
    sinopse: "Texto da Sinopse",
    capaVolume: mushoku,
    capitulos: [
      "Capítulo 01",
      "Capítulo 02",
      "Capítulo 03",
      "Capítulo 04",
      "Capítulo 05",
    ],
  },
  {
    indice: "03",
    titulo: "Volume 03",
    sinopse: "Texto da Sinopse",
    capaVolume: mushoku,
    capitulos: [
      "Capítulo 01",
      "Capítulo 02",
      "Capítulo 03",
      "Capítulo 04",
      "Capítulo 05",
    ],
  },
];

const ListaCapitulo: React.FC = () => {
    
    const idObra = 1;

  return (
    <LayoutDashBoard>
      <Container>
        <SecaoTitulo>
          <h1>Mushoku Tensei: Reencarnação do Desempregado</h1>
        </SecaoTitulo>
        <h2>Índice de Capítulos</h2>

        <SecaoBotoesAdicao>
            <BotaoAlteracao className="secundaria">
                <Link href={ROTAS.NOVOCAPITULO + "/" + idObra}>
                    <a>Adicionar Capítulo</a>
                </Link>
            </BotaoAlteracao>

            <BotaoAlteracao className="sucesso">
                <Link href={ROTAS.NOVOVOLUME + "/" + idObra}>
                    <a>Adicionar Volume</a>
                </Link>
            </BotaoAlteracao>
        </SecaoBotoesAdicao>

        <SecaoIndiceCapitulos>
          {volumes.map(({ indice, titulo, capaVolume, capitulos, sinopse }) => (
            <Acordeon
              key={indice}
              titulo={titulo}
              sinopse={sinopse}
              capaVolume={capaVolume}
              capitulos={capitulos}
            />
          ))}
        </SecaoIndiceCapitulos>
      </Container>
    </LayoutDashBoard>
  );
};

export default ListaCapitulo;

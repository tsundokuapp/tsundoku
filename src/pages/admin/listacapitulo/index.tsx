import React from "react";
import LayoutDashBoard from "components/LayoutDashBoard";
import Container, { SecaoTitulo, SecaoIndiceCapitulos} from "./styles";
import Acordeon from "components/Acordeon";

import mushoku from "assets/img/backgroudscard/MushokuTensei.png";

const volumes = [
  {
    indice: "01",
    titulo: "Volume 01",
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
    indice: "02",
    titulo: "Volume 02",
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
    
  return (
    <LayoutDashBoard>
      <Container>
        <SecaoTitulo>
          <h1>Mushoku Tensei: Reencarnação do Desempregado</h1>
        </SecaoTitulo>
        <h2>Índice de Capítulos</h2>

        <SecaoIndiceCapitulos>
          {volumes.map(({ indice, titulo, capaVolume, capitulos }) => (
            <Acordeon
              key={indice}
              titulo={titulo}
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

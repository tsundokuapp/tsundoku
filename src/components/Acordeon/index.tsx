import React, { useState } from 'react';
import Container, {Titulo, Conteudo, CapaVolume, ConteudoCapitulos} from './styles';

interface IAcordeon {
    //indice: string;
    titulo: string;
    capaVolume: string;
    capitulos: string[];
  }

const Acordeon: React.FC<IAcordeon> = ({ titulo, capaVolume, capitulos}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Container>
      <Titulo onClick={() => setIsActive(!isActive)}>
        <div>{titulo}</div>
        <div>{isActive ? '-' : '+'}</div>
      </Titulo>
      {isActive && <Conteudo>
          <CapaVolume src={capaVolume}/>

            {capitulos.map((capitulo) => (
                <ConteudoCapitulos>
                    {capitulo}
                </ConteudoCapitulos>
            ))}

          </Conteudo>}
    </Container>
  );
};

export default Acordeon;
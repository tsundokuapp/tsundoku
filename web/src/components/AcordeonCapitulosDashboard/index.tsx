import React, { useState } from 'react';
import Container, {Titulo, Conteudo, CapaVolume, ConteudoCapitulos, ConteudoSinopse} from './styles';

interface IAcordeonCapitulosDashboard {
    titulo: string;
    capaVolume: string;
    sinopse: string;
    capitulos: string[];
  }

const AcordeonCapitulosDashboard: React.FC<IAcordeonCapitulosDashboard> = ({ titulo, capaVolume, capitulos, sinopse}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Container>
      <Titulo onClick={() => setIsActive(!isActive)}>
        <div>{titulo}</div>
        <div>{isActive ? '-' : '+'}</div>
      </Titulo>      
      {isActive && <Conteudo>        
          <CapaVolume src={capaVolume}/>

            <ConteudoSinopse dangerouslySetInnerHTML={{ __html: sinopse }} />

            {capitulos.map((capitulo) => (
                <ConteudoCapitulos>
                    {capitulo}
                </ConteudoCapitulos>
            ))}
          </Conteudo>}
    </Container>
  );
};

export default AcordeonCapitulosDashboard;

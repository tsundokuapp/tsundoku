import React, { useState } from 'react';
import Link from 'next/link';
import Container, {Titulo, Conteudo, CapaVolume, ConteudoCapitulos, ConteudoSinopse, BotaoAlteracao} from './styles';
import * as ROTAS from "constants/rotas";
import { LinkNav } from 'components/Common/LinkNav';

interface ICapitulo {
  idCapitulo: string;
  capitulo: string;
}

interface IAcordeonCapitulosDashboard {
    idObra: number;
    titulo: string;
    capaVolume: string;
    sinopse: string;
    capitulos: Array<ICapitulo>;
  }

const AcordeonCapitulosDashboard: React.FC<IAcordeonCapitulosDashboard> = ({ idObra, titulo, capaVolume, capitulos, sinopse}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Container>
      <Titulo onClick={() => setIsActive(!isActive)}>
        <div>{titulo}</div>
      </Titulo>      
      {isActive && 
      <Conteudo>        
        <BotaoAlteracao className="quintiaria">
            <Link href={ROTAS.EDITARVOLUME + "/" + idObra}>
                <a>Editar</a>
            </Link>
        </BotaoAlteracao>        
        <CapaVolume src={capaVolume}/>
        <ConteudoSinopse dangerouslySetInnerHTML={{ __html: sinopse }} />
          {capitulos.map((capitulo) => (
              <ConteudoCapitulos key={capitulo.idCapitulo}>
                  <LinkNav textoLink={capitulo.capitulo} url={ROTAS.EDITARCAPITULO + "/" + capitulo.idCapitulo}/>
              </ConteudoCapitulos>
          ))}
      </Conteudo>}
    </Container>
  );
};

export default AcordeonCapitulosDashboard;

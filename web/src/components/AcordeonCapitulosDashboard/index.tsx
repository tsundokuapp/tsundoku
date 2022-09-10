import React, { useState } from 'react';
import Link from 'next/link';
import Container, {Titulo, Conteudo, CapaVolume, ConteudoCapitulos, ConteudoSinopse, BotaoAlteracao} from './styles';
import * as ROTAS from "constants/rotas";
import { LinkNav } from 'components/Common/LinkNav';

interface IAcordeonCapitulosDashboard {
    id: number;
    idObra: number;
    titulo: string;
    descritivovolume: string;
    capaVolume: string;
    sinopse: string;
    capitulos: Array<any>;
  }

const AcordeonCapitulosDashboard: React.FC<IAcordeonCapitulosDashboard> = ({ id, idObra, titulo, descritivovolume, capaVolume, sinopse, capitulos}) => {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <Container>
      <Titulo onClick={() => setIsActive(!isActive)}>        
        <h3>{descritivovolume}</h3>
      </Titulo>      
      {isActive && 
      <Conteudo>        
        <h4>{titulo}</h4>
        <BotaoAlteracao className="quintiaria">            
            <Link href={ROTAS.EDITARVOLUME + "/" + id}>
                <a>Editar</a>
            </Link>
        </BotaoAlteracao>        
        <CapaVolume src={capaVolume}/>
        <ConteudoSinopse dangerouslySetInnerHTML={{ __html: sinopse }} />
          {capitulos.map((capitulo) => (
              <ConteudoCapitulos key={capitulo.id}>                  
                  <LinkNav textoLink={capitulo.descritivoCapitulo + (capitulo.titulo === null ? "" : " - " + capitulo.titulo)} url={ROTAS.EDITARCAPITULO + "/" + capitulo.id}/>
              </ConteudoCapitulos>
          ))}
      </Conteudo>}
    </Container>
  );
};

export default AcordeonCapitulosDashboard;

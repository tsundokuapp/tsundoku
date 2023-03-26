import React, { useState } from 'react';
import Link from 'next/link';
import Container, {Titulo, Conteudo, CapaVolume, ConteudoCapitulos, ConteudoSinopse, BotaoAlteracao} from './styles';
import { ROTAS } from '../../../constants/rotas';

interface IAcordeonIndice {
    id: number;
    titulo: string;
    descritivovolume: string;
    capaVolume: string;
    sinopse: string;
    capitulos: Array<any>;
  }

const AcordeonIndice = ({ id, titulo, descritivovolume, capaVolume, sinopse, capitulos} : IAcordeonIndice) => {
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
          {capitulos?.map((capitulo) => (
              <ConteudoCapitulos key={capitulo?.id}>                                   
                  <Link href={ROTAS.EDITARCAPITULO + "/" + capitulo?.id}>
                    {capitulo?.descritivoCapitulo + (capitulo?.titulo === null ? "" : " - " + capitulo?.titulo)}
                  </Link>
              </ConteudoCapitulos>
          ))}
      </Conteudo>}
    </Container>
  );
};

export default AcordeonIndice;

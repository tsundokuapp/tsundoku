import React from "react";
import LayoutDashBoard from 'components/LayoutDashBoard';
import Container, { SecaoTitulo, SecaoIndiceCapitulos, BotaoAlteracao, SecaoBotoesAdicao} from "./styles";
import Acordeon from "components/AcordeonCapitulosDashboard";
import * as ROTAS from "constants/rotas";
import { LinkNav } from "components/Common/LinkNav";

const listaCapitulos = [
  {
    idCapitulo: "01",
    capitulo: "Capítulo 01"
  },
  {
    idCapitulo: "02",
    capitulo: "Capítulo 02"
  },
  {
    idCapitulo: "03",
    capitulo: "Capítulo 03"
  },
  {
    idCapitulo: "04",
    capitulo: "Capítulo 04"
  },
  {
    idCapitulo: "05",
    capitulo: "Capítulo 05"
  },
];

const volumes = [
  {
    indice: "01",
    titulo: "Volume 01",
    sinopse: `<p style="text-align: justify;">&nbsp;Um NEET otaku de 34 anos, expulso de casa por sua família, descobriu que sua vida chegou a um beco sem saída. Ele então lembrou que sua vida poderia ter sido realmente muito melhor se tivesse feito escolhas melhores no passado.</p>              
              <p style="text-align: justify;">Apenas quando chegou ao ponto de se arrepender, viu um caminhão correndo em direção de três estudantes do ensino médio. Reunindo toda a força que tinha, tentou salvá-los e acabou sendo atropelado, assim rapidamente perdendo sua vida.</p>
              <p style="text-align: justify;">E quando voltou a abrir os olhos, tinha reencarnado em um mundo com magias e espadas como Rudeus Greyrat. Nascido em um novo mundo, com uma nova vida, decidiu que: “Desta vez vou realmente viver minha vida ao máximo, sem arrependimentos!” Assim começa a jornada de um homem que anseia pelo recomeço de sua vida.</p>`,
    capaVolume: "https://i2.wp.com/tsundoku.com.br/wp-content/uploads/2022/07/MT_V16_Capa-01.jpg",
    capitulos: listaCapitulos,
  },
  {
    indice: "02",
    titulo: "Volume 02",
    sinopse: `<p style="text-align: justify;">Em um determinado lugar, havia uma bruxa viajante. Seu nome era Elaina.</p><p style="text-align: justify;">Por ser uma viajante, ela conheceu muitas pessoas e países enquanto continuava sua longa, longa jornada.</p>
              <p style="text-align: justify;">Um país que só aceitava magos, um gigante obcecado por músculos, um jovem às portas da morte aguardando o retorno de sua amada, uma princesa deixada sozinha no país em ruínas e a história da própria bruxa até agora e daqui para frente.</p>
              <p style="text-align: justify;">Enquanto conhece pessoas particularmente peculiares e experimenta os momentos de alegria de outras pessoas, mesmo agora, a bruxa continua contando a história do encontro e da separação.</p>
              <p style="text-align: justify;">— Por favor, não se preocupe. Afinal, sou uma viajante. Devo me apressar.</p>
              <p style="text-align: justify;">A Bruxa, Sim, eu.</p>`,
    capaVolume: "https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/MJ_V7_Capa.png",
    capitulos: listaCapitulos,
  },
  {
    indice: "03",
    titulo: "Volume 03",
    sinopse: `<p>A garota sentada ao meu lado no começo do novo semestre é a famosa Garota Perigosa, mas… a Chihara-san é mesmo o “Perigo” que todos dizem ser?</p>`,
    capaVolume:"https://i1.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/Capa-Chihara.jpg",
    capitulos: listaCapitulos,
  },
  {
    indice: "04",
    titulo: "Volume 01",
    sinopse: `<p style="text-align: justify;">&nbsp;Um NEET otaku de 34 anos, expulso de casa por sua família, descobriu que sua vida chegou a um beco sem saída. Ele então lembrou que sua vida poderia ter sido realmente muito melhor se tivesse feito escolhas melhores no passado.</p>              
              <p style="text-align: justify;">Apenas quando chegou ao ponto de se arrepender, viu um caminhão correndo em direção de três estudantes do ensino médio. Reunindo toda a força que tinha, tentou salvá-los e acabou sendo atropelado, assim rapidamente perdendo sua vida.</p>
              <p style="text-align: justify;">E quando voltou a abrir os olhos, tinha reencarnado em um mundo com magias e espadas como Rudeus Greyrat. Nascido em um novo mundo, com uma nova vida, decidiu que: “Desta vez vou realmente viver minha vida ao máximo, sem arrependimentos!” Assim começa a jornada de um homem que anseia pelo recomeço de sua vida.</p>`,
    capaVolume: "https://i2.wp.com/tsundoku.com.br/wp-content/uploads/2022/07/MT_V16_Capa-01.jpg",
    capitulos: listaCapitulos,
  },
  {    
    indice: "05",
    titulo: "Volume 02",
    sinopse: `<p style="text-align: justify;">Em um determinado lugar, havia uma bruxa viajante. Seu nome era Elaina.</p><p style="text-align: justify;">Por ser uma viajante, ela conheceu muitas pessoas e países enquanto continuava sua longa, longa jornada.</p>
              <p style="text-align: justify;">Um país que só aceitava magos, um gigante obcecado por músculos, um jovem às portas da morte aguardando o retorno de sua amada, uma princesa deixada sozinha no país em ruínas e a história da própria bruxa até agora e daqui para frente.</p>
              <p style="text-align: justify;">Enquanto conhece pessoas particularmente peculiares e experimenta os momentos de alegria de outras pessoas, mesmo agora, a bruxa continua contando a história do encontro e da separação.</p>
              <p style="text-align: justify;">— Por favor, não se preocupe. Afinal, sou uma viajante. Devo me apressar.</p>
              <p style="text-align: justify;">A Bruxa, Sim, eu.</p>`,
    capaVolume: "https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/MJ_V7_Capa.png",
    capitulos: listaCapitulos,
  },
  {   
    indice: "06",
    titulo: "Volume 03",
    sinopse: `<p>A garota sentada ao meu lado no começo do novo semestre é a famosa Garota Perigosa, mas… a Chihara-san é mesmo o “Perigo” que todos dizem ser?</p>`,
    capaVolume:"https://i1.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/Capa-Chihara.jpg",
    capitulos: listaCapitulos,
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
                <LinkNav textoLink="Adicionar Capítulo" url={ROTAS.NOVOCAPITULO + "/" + idObra}/>
            </BotaoAlteracao>

            <BotaoAlteracao className="sucesso">
                <LinkNav textoLink="Adicionar Volume" url={ROTAS.NOVOVOLUME + "/" + idObra}/>
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
              idObra={idObra}
            />
          ))}
        </SecaoIndiceCapitulos>
      </Container>
    </LayoutDashBoard>
  );
};

export default ListaCapitulo;

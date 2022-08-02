import Link from "next/link";
import React, { useState } from "react";
import LayoutDashBoard from 'components/LayoutDashBoard';
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import Container, {
  //Cards
  CardObra,
  ImagemCardObra,
  ContainerMeioCardObra,
  ContainerTituloAcoesCardObra,
  SecaoContentCard,
  BotaoAlteracao,
  ContainerBotoesAcaoCardObra,
  //Listas
  SecaoContentLista,
  ListaObra,
  //Navegação
  NavConsultas,
  InputPesquisa,
  BotaoPesquisar,
  BotaoTrocaCardLista,
} from "./styles";
import * as ROTAS from "constants/rotas";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import { Search } from "@material-ui/icons";
import AppsIcon from "@material-ui/icons/Apps";
import DehazeIcon from "@material-ui/icons/Dehaze";

const Obras: React.FC = () => {

  const listaObras = [
    {
      id:1,
      capaPrincipalObra: "https://i2.wp.com/tsundoku.com.br/wp-content/uploads/2022/07/MT_V16_Capa-01.jpg",
      tituloObra: "Mushoku Tensei: Reencarnação do Desempregado",     
    },
    {
      id:2,
      capaPrincipalObra: "https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/MJ_V7_Capa.png",
      tituloObra: "Bruxa Errante, a Jornada de Elaina",     
    },
    {
      id:3,
      capaPrincipalObra: "https://i1.wp.com/tsundoku.com.br/wp-content/uploads/2021/12/Capa-Chihara.jpg",
      tituloObra: "Jirai Nandesuka? Chihara-san",     
    },
    {
      id:4,
      capaPrincipalObra: "https://i3.wp.com/tsundoku.com.br/wp-content/uploads/2022/02/toxicGirlfriendCover2.png",
      tituloObra: "De Colega Tóxica a Metas de Namoro",     
    },
    {
      id:5,
      capaPrincipalObra: "https://i0.wp.com/tsundoku.com.br/wp-content/uploads/2022/01/parasita.jpg",
      tituloObra: "Parasita Apaixonado",
    }];

  const [secaoContentAtivo, setSecaoContentAtivo] = useState(true);

  const AlteraSecaoContent = () => {
    setSecaoContentAtivo(!secaoContentAtivo);
  };

  return (
    <LayoutDashBoard>
      <Container>
        <SecaoHeadBar>
          <NavPaginas>
            <LibraryBooksIcon />
            <h3>Obras</h3>
          </NavPaginas>
          <NavConsultas>
            <BotaoTrocaCardLista onClick={AlteraSecaoContent}>
              {secaoContentAtivo === true ? <DehazeIcon /> : <AppsIcon />}
            </BotaoTrocaCardLista>
            <InputPesquisa placeholder="Pesquisar..." />
            <BotaoPesquisar>
              <Search fontSize="small" />
            </BotaoPesquisar>
          </NavConsultas>
        </SecaoHeadBar>
        <SecaoContentCard visivel={secaoContentAtivo}>

          {listaObras.map((obra) => {
            return (
              <CardObra key={obra.id}>
              <ImagemCardObra src={obra.capaPrincipalObra} />
              <ContainerMeioCardObra>
                <ContainerTituloAcoesCardObra cardLista={secaoContentAtivo}>
                  <span className="titulo-card-obra">
                    {obra.tituloObra}
                  </span>
                  <ContainerBotoesAcaoCardObra cardLista={secaoContentAtivo}>
                    <BotaoAlteracao className="sucesso">
                        <Link href={ROTAS.INDICEOBRAS + "/" + obra.id}>
                          <a>Índice</a>
                        </Link>
                      </BotaoAlteracao>
                    <BotaoAlteracao className="secundaria">                    
                      <Link href={ROTAS.EDITAROBRA + "/" + obra.id}>
                        <a>Editar</a>
                      </Link>
                    </BotaoAlteracao>                 
                  </ContainerBotoesAcaoCardObra>
                </ContainerTituloAcoesCardObra>
              </ContainerMeioCardObra>
            </CardObra>
            );})
          }

        </SecaoContentCard>

        <SecaoContentLista visivel={!secaoContentAtivo}>

          {listaObras.map((obra) => {
            return (
              <ListaObra key={obra.id}>
                <span className="titulo-card-obra">
                  {obra.tituloObra}
                </span>
                <ContainerBotoesAcaoCardObra cardLista={secaoContentAtivo}>
                  <BotaoAlteracao className="sucesso">
                    <Link href={ROTAS.INDICEOBRAS + "/" + obra.id}>
                      <a>Índice</a>
                    </Link>
                  </BotaoAlteracao>
                  <BotaoAlteracao className="secundaria">                    
                    <Link href={ROTAS.EDITAROBRA + "/" + obra.id}>
                      <a>Editar</a>
                    </Link>
                  </BotaoAlteracao>
                </ContainerBotoesAcaoCardObra>
              </ListaObra>
            );})
          }    

        </SecaoContentLista>
      </Container>
    </LayoutDashBoard>
  );
};

export default Obras;

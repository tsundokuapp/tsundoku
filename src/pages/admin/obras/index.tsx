import Link from "next/link";
import React, { useState } from "react";
import LayoutDashBoard from "components/LayoutDashBoard";
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
import mushoku from "assets/img/backgroudscard/MushokuTensei.png";
import { Search } from "@material-ui/icons";
import AppsIcon from "@material-ui/icons/Apps";
import DehazeIcon from "@material-ui/icons/Dehaze";

const Obras: React.FC = () => {
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
          <CardObra>
            <ImagemCardObra src={mushoku} />
            <ContainerMeioCardObra>
              <ContainerTituloAcoesCardObra cardLista={secaoContentAtivo}>
                <span className="titulo-card-obra">
                  Mushoku Tensei: Reencarnação do Desempregado
                </span>
                <ContainerBotoesAcaoCardObra cardLista={secaoContentAtivo}>
                  <BotaoAlteracao className="sucesso">Capítulos</BotaoAlteracao>
                  <BotaoAlteracao className="secundaria">                    
                    <Link href={ROTAS.EDITAROBRA}>
                      <a>Editar</a>
                    </Link>
                  </BotaoAlteracao>
                  <BotaoAlteracao className="aviso">Excluir</BotaoAlteracao>
                </ContainerBotoesAcaoCardObra>
              </ContainerTituloAcoesCardObra>
            </ContainerMeioCardObra>
          </CardObra>
          <CardObra>
            <ImagemCardObra src={mushoku} />
            <ContainerMeioCardObra>
              <ContainerTituloAcoesCardObra cardLista={secaoContentAtivo}>
                <span className="titulo-card-obra">
                  Mushoku Tensei: Reencarnação do Desempregado
                </span>
                <ContainerBotoesAcaoCardObra cardLista={secaoContentAtivo}>
                  <BotaoAlteracao className="sucesso">Capítulos</BotaoAlteracao>
                  <BotaoAlteracao className="secundaria">Editar</BotaoAlteracao>
                  <BotaoAlteracao className="aviso">Excluir</BotaoAlteracao>
                </ContainerBotoesAcaoCardObra>
              </ContainerTituloAcoesCardObra>
            </ContainerMeioCardObra>
          </CardObra>
          <CardObra>
            <ImagemCardObra src={mushoku} />
            <ContainerMeioCardObra>
              <ContainerTituloAcoesCardObra cardLista={secaoContentAtivo}>
                <span className="titulo-card-obra">
                  Mushoku Tensei: Reencarnação do Desempregado
                </span>
                <ContainerBotoesAcaoCardObra cardLista={secaoContentAtivo}>
                  <BotaoAlteracao className="sucesso">Capítulos</BotaoAlteracao>
                  <BotaoAlteracao className="secundaria">Editar</BotaoAlteracao>
                  <BotaoAlteracao className="aviso">Excluir</BotaoAlteracao>
                </ContainerBotoesAcaoCardObra>
              </ContainerTituloAcoesCardObra>
            </ContainerMeioCardObra>
          </CardObra>
          <CardObra>
            <ImagemCardObra src={mushoku} />
            <ContainerMeioCardObra>
              <ContainerTituloAcoesCardObra cardLista={secaoContentAtivo}>
                <span className="titulo-card-obra">
                  Mushoku Tensei: Reencarnação do Desempregado
                </span>
                <ContainerBotoesAcaoCardObra cardLista={secaoContentAtivo}>
                  <BotaoAlteracao className="sucesso">Capítulos</BotaoAlteracao>
                  <BotaoAlteracao className="secundaria">Editar</BotaoAlteracao>
                  <BotaoAlteracao className="aviso">Excluir</BotaoAlteracao>
                </ContainerBotoesAcaoCardObra>
              </ContainerTituloAcoesCardObra>
            </ContainerMeioCardObra>
          </CardObra>
          <CardObra>
            <ImagemCardObra src={mushoku} />
            <ContainerMeioCardObra>
              <ContainerTituloAcoesCardObra cardLista={secaoContentAtivo}>
                <span className="titulo-card-obra">
                  Mushoku Tensei: Reencarnação do Desempregado
                </span>
                <ContainerBotoesAcaoCardObra cardLista={secaoContentAtivo}>
                  <BotaoAlteracao className="sucesso">Capítulos</BotaoAlteracao>
                  <BotaoAlteracao className="secundaria">Editar</BotaoAlteracao>
                  <BotaoAlteracao className="aviso">Excluir</BotaoAlteracao>
                </ContainerBotoesAcaoCardObra>
              </ContainerTituloAcoesCardObra>
            </ContainerMeioCardObra>
          </CardObra>
          <CardObra>
            <ImagemCardObra src={mushoku} />
            <ContainerMeioCardObra>
              <ContainerTituloAcoesCardObra cardLista={secaoContentAtivo}>
                <span className="titulo-card-obra">
                  Mushoku Tensei: Reencarnação do Desempregado
                </span>
                <ContainerBotoesAcaoCardObra cardLista={secaoContentAtivo}>
                  <BotaoAlteracao className="sucesso">Capítulos</BotaoAlteracao>
                  <BotaoAlteracao className="secundaria">Editar</BotaoAlteracao>
                  <BotaoAlteracao className="aviso">Excluir</BotaoAlteracao>
                </ContainerBotoesAcaoCardObra>
              </ContainerTituloAcoesCardObra>
            </ContainerMeioCardObra>
          </CardObra>
          <CardObra>
            <ImagemCardObra src={mushoku} />
            <ContainerMeioCardObra>
              <ContainerTituloAcoesCardObra cardLista={secaoContentAtivo}>
                <span className="titulo-card-obra">
                  Mushoku Tensei: Reencarnação do Desempregado
                </span>
                <ContainerBotoesAcaoCardObra cardLista={secaoContentAtivo}>
                  <BotaoAlteracao className="sucesso">Capítulos</BotaoAlteracao>
                  <BotaoAlteracao className="secundaria">Editar</BotaoAlteracao>
                  <BotaoAlteracao className="aviso">Excluir</BotaoAlteracao>
                </ContainerBotoesAcaoCardObra>
              </ContainerTituloAcoesCardObra>
            </ContainerMeioCardObra>
          </CardObra>
        </SecaoContentCard>
        <SecaoContentLista visivel={!secaoContentAtivo}>
          <ListaObra>
            <span className="titulo-card-obra">
              Mushoku Tensei: Reencarnação do Desempregado
            </span>
            <ContainerBotoesAcaoCardObra cardLista={secaoContentAtivo}>
              <BotaoAlteracao className="sucesso">Capítulos</BotaoAlteracao>
              <BotaoAlteracao className="secundaria">Editar</BotaoAlteracao>
              <BotaoAlteracao className="aviso">Excluir</BotaoAlteracao>
            </ContainerBotoesAcaoCardObra>
          </ListaObra>
          <ListaObra>
            <span className="titulo-card-obra">
              Mushoku Tensei: Reencarnação do Desempregado
            </span>
            <ContainerBotoesAcaoCardObra cardLista={secaoContentAtivo}>
              <BotaoAlteracao className="sucesso">Capítulos</BotaoAlteracao>
              <BotaoAlteracao className="secundaria">Editar</BotaoAlteracao>
              <BotaoAlteracao className="aviso">Excluir</BotaoAlteracao>
            </ContainerBotoesAcaoCardObra>
          </ListaObra>
          <ListaObra>
            <span className="titulo-card-obra">
              Mushoku Tensei: Reencarnação do Desempregado
            </span>
            <ContainerBotoesAcaoCardObra cardLista={secaoContentAtivo}>
              <BotaoAlteracao className="sucesso">Capítulos</BotaoAlteracao>
              <BotaoAlteracao className="secundaria">Editar</BotaoAlteracao>
              <BotaoAlteracao className="aviso">Excluir</BotaoAlteracao>
            </ContainerBotoesAcaoCardObra>
          </ListaObra>
        </SecaoContentLista>
      </Container>
    </LayoutDashBoard>
  );
};

export default Obras;

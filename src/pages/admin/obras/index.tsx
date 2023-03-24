import React, { useState } from 'react';
import Link from 'next/link';
import LayoutAdminMain from '../../../components/Layouts/Admin/Main';
import SecaoHeadBar from '../../../components/Admin/SecaoHeadBar';
import NavPaginas from '../../../components/Admin/NavPaginas';
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
} from './styles';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { Search } from '@material-ui/icons';
import AppsIcon from '@material-ui/icons/Apps';
import DehazeIcon from '@material-ui/icons/Dehaze';
import https from 'https';
import API from '../../../pages/api/api';
import { ROTAS } from '../../../constants/rotas';

interface IObra {
    id: number;
    titulo: string;
    tituloAlternativo: string;
    autorObra: string;
    artista: string;
    ano: string;
    slug: string;
    visualizacoes: number;
    usuarioCadastro: string;
    usuarioAlteracao: string;
    enderecoUrlCapa: string;
    sinopse: string;
    ehObraMaiorIdade: boolean;
    dataInclusao: Date;
    dataAlteracao: Date;
    statusObraId: number;
    tipoObraId: number;
}

interface IObras {
    obras: Array<IObra>;
}

const Obras = (props: IObras) => {
    const obras = props.obras;
    const [secaoContentAtivo, setSecaoContentAtivo] = useState(true);

    const AlteraSecaoContent = () => {
        setSecaoContentAtivo(!secaoContentAtivo);
    };

    return (
        <LayoutAdminMain>
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
                    {obras.map((obra) => {
                        return (
                            <CardObra key={obra.id}>
                                <ImagemCardObra src={obra.enderecoUrlCapa} />
                                <ContainerMeioCardObra>
                                    <ContainerTituloAcoesCardObra cardLista={secaoContentAtivo}>
                                        <span className="titulo-card-obra">
                                            {obra.titulo}
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
                        );
                    })
                    }

                </SecaoContentCard>

                <SecaoContentLista visivel={!secaoContentAtivo}>
                    {obras.map((obra) => {
                        return (
                            <ListaObra key={obra.id}>
                                <span className="titulo-card-obra">
                                    {obra.titulo}
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
                        );
                    })
                    }

                </SecaoContentLista>
            </Container>
        </LayoutAdminMain>
    );
};

export async function getStaticProps() {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const response = await API.get("obra", { httpsAgent });
    const obras = response.data;
    return { props: { obras } }
}

export default Obras;

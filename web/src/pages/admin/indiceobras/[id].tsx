import React from "react";
import LayoutDashBoard from "components/LayoutDashBoard";
import Container, {
    SecaoTitulo,
    SecaoIndiceCapitulos,
    BotaoAlteracao,
    SecaoBotoesAdicao,
} from "./styles";
import Acordeon from "components/AcordeonCapitulosDashboard";
import * as ROTAS from "constants/rotas";
import { LinkNav } from "components/Common/LinkNav";
import https from "https";
import API from "services/API";
import { GetStaticProps, InferGetStaticPropsType } from 'next'

const ListaCapitulo: React.FC = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => { 
    return (
        <LayoutDashBoard>
            <Container>
                <SecaoTitulo>
                    <h1>{data?.titulo}</h1>
                </SecaoTitulo>
                <h2>Índice de Capítulos</h2>

                <SecaoBotoesAdicao>
                    <BotaoAlteracao className="secundaria">
                        <LinkNav
                            textoLink="Adicionar Capítulo"
                            url={ROTAS.NOVOCAPITULO + "/" + data?.id}
                        />
                    </BotaoAlteracao>

                    <BotaoAlteracao className="sucesso">
                        <LinkNav
                            textoLink="Adicionar Volume"
                            url={ROTAS.NOVOVOLUME + "/" + data?.id}
                        />
                    </BotaoAlteracao>
                </SecaoBotoesAdicao>

                <SecaoIndiceCapitulos>
                    {data?.volumes.map(
                        (volume: any) => (
                            <Acordeon
                                key={volume?.id}
                                id={volume?.id}
                                idObra={volume?.obraId}
                                titulo={volume?.titulo}
                                descritivovolume={volume?.descritivoVolume}
                                capaVolume={volume?.enderecoUrlCapa}
                                sinopse={volume?.sinopse}
                                capitulos={volume?.capitulos}
                            />
                        )
                    )}
                </SecaoIndiceCapitulos>
            </Container>
        </LayoutDashBoard>
    );
};

export async function getStaticPaths() {   
    return { paths: [], fallback: true };
}

export const getStaticProps: GetStaticProps = async (context) => {    
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const { data } = await API.get(`obra/${context.params?.id}`, { httpsAgent });

    return { props: { data } };
}

export default ListaCapitulo;

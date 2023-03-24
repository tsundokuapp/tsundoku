import React from 'react';
import Link from 'next/link';
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import LayoutAdminMain from '../../../components/Layouts/Admin/Main';
import Container, { SecaoTitulo, SecaoIndiceCapitulos, BotaoAlteracao, SecaoBotoesAdicao} from './styles';
import AcordeonIndice from '../../../components/Admin/AcordeonIndice';
import https from 'https';
import API from '../../../pages/api/api';
import { ROTAS } from '../../../constants/rotas';

const ListaCapitulo = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <LayoutAdminMain>
            <Container>
                <SecaoTitulo>
                    <h1>{data?.titulo}</h1>
                </SecaoTitulo>
                <h2>Índice de Capítulos</h2>

                <SecaoBotoesAdicao>
                    <BotaoAlteracao className="sucesso">                        
                        <Link href={ROTAS.NOVOVOLUME + "/" + data?.id}>
                            Adicionar Volume
                        </Link>
                    </BotaoAlteracao>
                    
                    <BotaoAlteracao className="secundaria">                        
                        <Link href={ROTAS.NOVOCAPITULO + "/" + data?.id}>
                            Adicionar Capítulo
                        </Link>
                    </BotaoAlteracao>
                </SecaoBotoesAdicao>

                <SecaoIndiceCapitulos>
                    {data?.volumes.map(
                        (volume: any) => (
                            <AcordeonIndice
                                key={volume?.id}
                                id={volume?.id}
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
        </LayoutAdminMain>
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

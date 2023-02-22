import React, { useState } from "react";
import LayoutDashBoard from 'components/LayoutDashBoard';
import { Formik, Form, Field } from "formik";
import Container, {ContainerForm, SecaoInputs, SecaoCapaObra, ImagemCapaObraPrincipal, SecaoBotoesSubmit, } from "../novaobra/styles";
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditorTsun from "components/EditorTsun/index";
import Blob from 'cross-blob';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import https from "https";
import API from "services/API";
import * as ROTAS from "constants/rotas";

interface Values {
    Id: string;
    ObraId: string;
    ImagemCapa: File | any;
    CapaVolumeObra: string;
    Titulo: string;
    Numero: number;
    Sinopse: string;
    UsuarioAlteracao: string;
    Slug: string;
}

const EditarVolume: React.FC = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const handleSubmit = (valores: Values) => {        
        const formData = new FormData();    
        formData.append("Id", valores?.Id)
        formData.append("ObraId", valores.ObraId)
        formData.append("ImagemCapa", valores.ImagemCapa)
        formData.append("Titulo", valores.Titulo)
        formData.append("Numero", String(valores.Numero))
        formData.append("Sinopse", valores.Sinopse)
        formData.append("UsuarioAlteracao", valores.UsuarioAlteracao)
    
        API.put("volume", formData, { headers: {'Content-Type': 'multipart/form-data'}})
        .then((response) => { 
            if(response.status === 200){
                alert('Volume alterado com sucesso!')
                window.location.href = ROTAS.INDICEOBRAS + `/${valores.ObraId}`;
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };  

    const initialValues: Values = {   
        Id: data?.id,
        ObraId: data?.obraId,
        ImagemCapa: null,
        CapaVolumeObra: data?.enderecoUrlCapa,
        Titulo: data?.titulo,
        Numero: data?.numero,
        Sinopse: data?.sinopse,
        UsuarioAlteracao: 'Bravo',
        Slug: data?.slug,
    };

    const valorInicialImagem = new Blob();
    const [valorConteudoEditor, setValorConteudoEditor] = useState(initialValues.Sinopse);
    const [imagemCapa, setImagemCapa] = useState(valorInicialImagem);
    const [enderecoImagemCapa] = useState(initialValues.CapaVolumeObra);  

    const handleImagemCapa = (event: any) => {
        setImagemCapa(event.target.files[0]);
    }   

    const excluirObra = () => {
        alert("Usuário sem permissão para excluir. Contate o Bravo!");
    }

    console.log('Dados Volume: ', data);

    return (
        <LayoutDashBoard>
            <Container>
                <SecaoHeadBar>
                    <NavPaginas>
                        <AddBoxIcon />
                        <h3>Editar Volume</h3>
                    </NavPaginas>
                </SecaoHeadBar>
                <ContainerForm>
                    <SecaoInputs>
                        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                            {({ values , setFieldValue }) => (
                                <Form>
                                    <label htmlFor="ImagemCapa">Capa Volume: </label>
                                    <input className="inputIncluiCapaPrincipal" id="ImagemCapa" name="ImagemCapa" type="file" onChange={(e:any) => { setFieldValue("ImagemCapa", e.target.files[0]); handleImagemCapa(e) }} />

                                    <label htmlFor="Titulo">Título do Volume: </label>
                                    <Field className="InputCampoDados InputCampoDadosNumber" id="Titulo" name="Titulo" type="text" />

                                    <label htmlFor="Numero">Número Volume: </label>
                                    <Field className="InputCampoDados InputCampoDadosNumber" id="Numero" name="Numero" type="number" /> 

                                    <label htmlFor="Slug">Slug do Volume: </label>
                                    <Field className="InputCampoDados InputCampoDadosNumber" id="Slug" name="Slug" type="text" disabled={true} />   

                                    <label htmlFor="Sinopse">Sinopse Volume:</label>                
                                    <EditorTsun larguraEditor='90%' tamanhoEditor='200px' valorConteudoEditor={valorConteudoEditor} setValorConteudoEditor={setValorConteudoEditor} />

                                    <SecaoBotoesSubmit>
                                        <button className="botao-submit secundaria" type="submit">Alterar</button>                
                                        <button className="botao-submit aviso" type="button" onClick={excluirObra}>Excluir</button>
                                    </SecaoBotoesSubmit>
                                    
                                    <Field className="InputCampoDados inputText hidden" id="Sinopse" name="Sinopse" as="textarea" value={values.Sinopse = valorConteudoEditor} />
                                </Form>
                            )}
                        </Formik>
                    </SecaoInputs>
                    <SecaoCapaObra>
                    {imagemCapa.size > 0 ? <ImagemCapaObraPrincipal src={URL.createObjectURL(imagemCapa)} alt='Capa do Volume'/> : <ImagemCapaObraPrincipal src={enderecoImagemCapa} alt='Capa do Volume' />}
                    </SecaoCapaObra>
                </ContainerForm>
            </Container>
        </LayoutDashBoard>
    );
};

export async function getStaticPaths() {   

    return { paths: [], fallback: true };
}

export const getStaticProps: GetStaticProps = async (context) => {
    
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const { data } = await API.get(`volume/${context.params?.id}`, { httpsAgent });
    return { props: { data } };
}

export default EditarVolume;

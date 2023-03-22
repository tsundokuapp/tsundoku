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
    ObraId: string;
    ImagemCapa: File | any;
    Titulo: string;
    Numero: number;
    Sinopse: string;
    UsuarioCadastro: string;
}

import capaPrincipal from '../../../../public/assets/img/logoTemaLight.svg';

const NovoVolume: React.FC = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {    
    const handleSubmit = (valores: Values) => {        
        const formData = new FormData();    
        formData.append("ObraId", valores.ObraId)
        formData.append("ImagemCapa", valores.ImagemCapa)
        formData.append("Titulo", valores.Titulo)
        formData.append("Numero", String(valores.Numero))
        formData.append("Sinopse", valores.Sinopse)
        formData.append("UsuarioCadastro", valores.UsuarioCadastro)
    
        API.post("volume", formData, { headers: {'Content-Type': 'multipart/form-data'}})
        .then((response) => { 
            if(response.status === 200){
                window.location.href = ROTAS.INDICEOBRAS + `/${valores.ObraId}`;
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };   

    const initialValues: Values = {
        ObraId: data.id,
        ImagemCapa: null,
        Titulo: "",
        Numero: 0,
        Sinopse: "",
        UsuarioCadastro: "Bravo"
    };

    const valorInicialImagem = new Blob();
    const [valorConteudoEditor, setValorConteudoEditor] = useState(initialValues.Sinopse);
    const [imagemCapa, setImagemCapa] = useState(valorInicialImagem);
    const [enderecoImagemCapa] = useState(capaPrincipal);

    const handleImagemCapa = (event: any) => {
        setImagemCapa(event.target.files[0]);
    }

    return (
        <LayoutDashBoard>
            <Container>
                <SecaoHeadBar>
                    <NavPaginas>
                        <AddBoxIcon />
                        <h3>Novo Volume</h3>
                    </NavPaginas>
                </SecaoHeadBar>
                <ContainerForm>
                    <SecaoInputs>
                        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        {({ values , setFieldValue }) => (
                            <Form>
                                <label htmlFor="ImagemCapa">Capa Volume: </label>
                                <input className="inputIncluiCapaPrincipal" id="ImagemCapa" name="ImagemCapa" type="file" onChange={(e:any) => { setFieldValue("ImagemCapa", e.target.files[0]); handleImagemCapa(e) }} />

                                <label htmlFor="Titulo">Título Volume: </label>
                                <Field className="InputCampoDados InputCampoDadosNumber" id="Titulo" name="Titulo" type="text"/> 

                                <label htmlFor="Numero">Número Volume: </label>
                                <Field className="InputCampoDados InputCampoDadosNumber" id="Numero" name="Numero" type="text"/>   

                                <label htmlFor="Sinopse">Sinopse Volume:</label>                
                                <EditorTsun larguraEditor='90%' tamanhoEditor='200px' valorConteudoEditor={valorConteudoEditor} setValorConteudoEditor={setValorConteudoEditor} />

                                <SecaoBotoesSubmit>
                                    <button className="botao-submit sucesso" type="submit">
                                        Adicionar
                                    </button>
                                </SecaoBotoesSubmit>

                                <Field className="InputCampoDados inputText hidden" id="Sinopse" name="Sinopse" as="textarea" value={values.Sinopse = valorConteudoEditor} />
                            </Form>
                        )}
                        </Formik>
                    </SecaoInputs>
                    <SecaoCapaObra>
                        {imagemCapa.size > 0 ? <ImagemCapaObraPrincipal src={URL.createObjectURL(imagemCapa)} alt='Capa Principal'/> : <ImagemCapaObraPrincipal src={enderecoImagemCapa} alt='Capa Principal' />}
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
    const { data } = await API.get(`obra/${context.params?.id}`, { httpsAgent });

    return { props: { data } };
}


export default NovoVolume;

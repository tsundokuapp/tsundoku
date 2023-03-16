import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import LayoutDashBoard from 'components/LayoutDashBoard';
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import EditorTsun from "components/EditorTsun/index";
import InputFiles from "components/Common/InputFiles/InputFiles";
import Container, { ContainerForm, SecaoInputs, SecaoCapaObra, ImagemCapaObraPrincipal, SecaoOutrasInformacoes, SecaoGeneros, SecaoBotoesSubmit, } from "../novaobra/styles";
import EditIcon from '@material-ui/icons/Edit';
import Blob from 'cross-blob';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import https from "https";
import API from "services/API";
import * as ROTAS from "constants/rotas";

interface Values {
    IdObra: string,
    ImagemCapa: File | any;
    Titulo: string;
    TituloAlternativo: string;
    AutorObra: string;
    Artista: string;
    Ano: string;
    UsuarioAlteracao: string;
    StatusObraId: number;
    TipoObraId: number;
    Sinopse: string;
    EhObraMaiorIdade: boolean;
    ListaGeneros: any[];
    CapaPrincipalObra: string;
    Slug: string;
    Generos: string[];
};

const EditarObra: React.FC = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const handleSubmit = (valores: Values) => {
        const formData = new FormData();
        formData.append("Id", valores.IdObra)
        formData.append("ImagemCapa", valores.ImagemCapa)
        formData.append("Titulo", valores.Titulo)
        formData.append("TituloAlternativo", valores.TituloAlternativo)
        formData.append("AutorObra", valores.AutorObra)
        formData.append("Artista", valores.Artista)
        formData.append("Ano", valores.Ano)
        formData.append("UsuarioAlteracao", valores.UsuarioAlteracao)
        formData.append("StatusObraId", String(valores.StatusObraId))
        formData.append("TipoObraId", String(valores.TipoObraId))
        formData.append("Sinopse", valores.Sinopse)
        formData.append("EhObraMaiorIdade", String(valores.EhObraMaiorIdade))
        formData.append("ListaGeneros", String(valores.Generos))

        API.put("obra", formData, { headers: { 'Content-Type': 'multipart/form-data' } })           
            .then((response: any) => {
                if (response.status === 200) {
                    alert('Obra alterada com sucesso!')
                    window.location.href = ROTAS.OBRAS;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const excluirObra = () => {
        alert("Usuário sem permissão para excluir. Contate o Bravo!");
    }

    const listaDescricaoGenero = [];
    const initialValues: Values = {
        IdObra: data?.obra.id,
        ImagemCapa: null,
        Titulo: data?.obra.titulo,
        TituloAlternativo: data?.obra.tituloAlternativo,
        AutorObra: data?.obra.autorObra,
        Artista: data?.obra.artista,
        Ano: data?.obra.ano,
        UsuarioAlteracao: "",
        StatusObraId: data?.obra.statusObraId,
        TipoObraId: data?.obra.tipoObraId,
        Sinopse: data?.obra.sinopse,
        EhObraMaiorIdade: data?.obra.ehObraMaiorIdade,
        ListaGeneros: data?.obra.generos,
        Generos: [],
        CapaPrincipalObra: data?.obra.enderecoUrlCapa,
        Slug: data?.obra.slug,
    };

    if (initialValues?.ListaGeneros !== undefined) {
        for (let genero of initialValues?.ListaGeneros) {
            listaDescricaoGenero.push(genero?.descricao);
        }
    }

    const valorInicialImagem = new Blob();

    const [valorConteudoEditor, setValorConteudoEditor] = useState(initialValues.Sinopse);
    const [imagemCapa, setImagemCapa] = useState(valorInicialImagem);
    const [enderecoImagemCapa] = useState(initialValues.CapaPrincipalObra);
    const [listaGeneros] = useState(listaDescricaoGenero);

    const handleImagemCapa = (event: any) => {
        setImagemCapa(event.target.files[0]);
    }

    const handleCheckState = (opcao: any) => {
        return listaGeneros?.some(genero => (genero === opcao));
    };

    const handleChange = (opcao: any) => {

        if (listaGeneros?.some(genero => (genero === opcao))) {
            listaGeneros?.splice(listaGeneros.indexOf(opcao), 1);
        }
        else {
            listaGeneros?.push(opcao);
        }
    }

    return (
        <LayoutDashBoard>
            <Container>
                <SecaoHeadBar>
                    <NavPaginas>
                        <EditIcon />
                        <h3>Editar Obra</h3>
                    </NavPaginas>
                </SecaoHeadBar>
                <ContainerForm>
                    <SecaoInputs>
                        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                            {({ values, setFieldValue }) => (
                                <Form >

                                    <label htmlFor="ImagemCapa" >Capa Principal: </label>
                                    <InputFiles 
                                        classNameInput="inputIncluiCapaPrincipal" 
                                        idInput="ImagemCapa" 
                                        nameInput="ImagemCapa" 
                                        multipleInput={false}
                                        onChangeInput={(e: any) => { setFieldValue("ImagemCapa", e.target.files[0]); handleImagemCapa(e) }}
                                        typeInput={"file"}
                                        textoBotao="Selecione a imagem para capa da obra"  
                                    />

                                    <label htmlFor="Titulo" className="inputTitulo">Título da Obra: </label>
                                    <Field className="InputCampoDados" id="Titulo" name="Titulo" type="text" />

                                    <label htmlFor="TituloAlternativo">Títulos alternativos: </label>
                                    <Field className="InputCampoDados" id="TituloAlternativo" name="TituloAlternativo" type="text" />

                                    <label htmlFor="Slug">Slug: </label>
                                    <Field className="InputCampoDados" id="Slug" name="Slug" type="text" disabled={true} />

                                    <label htmlFor="AutorObra">Autor(es): </label>
                                    <Field className="InputCampoDados" id="AutorObra" name="AutorObra" type="text" />

                                    <label htmlFor="Artista">Artista(s): </label>
                                    <Field className="InputCampoDados" id="Artista" name="Artista" type="text" />

                                    <label htmlFor="Ano"> Ano de publicação:{" "} </label>
                                    <Field className="InputCampoDados" id="Ano" name="Ano" type="text" />

                                    <label htmlFor="ListaGeneros">Gêneros: </label>

                                    <SecaoGeneros>
                                        <Field className="hidden" type="checkbox" name="Generos" value={values.Generos = listaGeneros} />
                                        {data?.listaGeneros?.map((generoObra: any) => {
                                            return (
                                                <label key={generoObra?.id}>
                                                    <Field className="checkBoxGeneros" type="checkbox" name="ListaGeneros" value={generoObra?.descricao}
                                                        checked={handleCheckState(generoObra?.descricao)}
                                                        onClick={(e: any) => handleChange(e.target.value)}
                                                    />
                                                    {generoObra?.descricao}
                                                </label>
                                            );
                                        }
                                        )}
                                    </SecaoGeneros>

                                    <label htmlFor="Sinopse">Sinopse:</label>
                                    <EditorTsun larguraEditor='100%' tamanhoEditor='200px' valorConteudoEditor={valorConteudoEditor} setValorConteudoEditor={setValorConteudoEditor} />

                                    <SecaoOutrasInformacoes>
                                        <label>
                                            <Field className="checkBoxOutrasInformacoes" type="checkbox" name="EhObraMaiorIdade" />
                                            +18
                                        </label>

                                        <Field name="TipoObraId" id="TipoObraId">
                                            {({ field }: FieldProps) => {
                                                const options = data?.listaTipoObra?.map((tipoObra: any) => { return (<option key={tipoObra?.id} value={tipoObra?.id}>{tipoObra?.descricao}</option>); });
                                                return (
                                                    <div>
                                                        <select className="selectTipoObras" {...field}> {options} </select>
                                                    </div>
                                                );
                                            }}
                                        </Field>

                                        <Field name="StatusObraId" id="StatusObraId" >
                                            {({ field }: FieldProps) => {
                                                const options = data?.listaStatusObra?.map((statusObra: any) => { return (<option key={statusObra?.id} value={statusObra?.id}>{statusObra?.descricao}</option>); });
                                                return (
                                                    <div>
                                                        <select className="selectTipoObras" {...field}>{options}</select>
                                                    </div>
                                                );
                                            }}
                                        </Field>
                                    </SecaoOutrasInformacoes>

                                    <SecaoBotoesSubmit>
                                        <button className="botao-submit secundaria" type="submit">Alterar</button>
                                        <button className="botao-submit aviso" type="button" onClick={excluirObra}>Excluir</button>
                                    </SecaoBotoesSubmit>

                                    <Field className="InputCampoDados inputText hidden" id="Sinopse" name="Sinopse" as="textarea" value={values.Sinopse = valorConteudoEditor} />
                                    <input className="InputCampoDados inputText hidden" type="text" id="IdObra" name="IdObra" />
                                </Form>
                            )}
                        </Formik>
                    </SecaoInputs>
                    <SecaoCapaObra>
                        {imagemCapa.size > 0 ? <ImagemCapaObraPrincipal src={URL.createObjectURL(imagemCapa)} alt='Capa Principal' /> : <ImagemCapaObraPrincipal src={enderecoImagemCapa} alt='Capa Principal' />}
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
    const { data } = await API.get(`obra/informacoes-obra/${context.params?.id}`, { httpsAgent });

    return { props: { data } };
}

export default EditarObra;

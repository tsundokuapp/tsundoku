import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import Blob from "cross-blob";
import LayoutDashBoard from "components/LayoutDashBoard";
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import EditorTsun from "components/EditorTsun/index";
import Container, {
    ContainerForm,
    SecaoInputs,
    SecaoCapaObra,
    ImagemCapaObraPrincipal,
    SecaoOutrasInformacoes,
    SecaoGeneros,
    SecaoBotoesSubmit,
} from "./styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import * as ROTAS from "constants/rotas";
import API from "services/API";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import https from "https";
import capaPrincipal from "../../../../public/assets/img/logoTemaLight.svg";
import InputFiles from "components/Common/InputFiles/InputFiles";

interface Values {
    ImagemCapa: File | any;
    Titulo: string;
    TituloAlternativo: string;
    AutorObra: string;
    Artista: string;
    Ano: string;
    UsuarioCadastro: string;
    StatusObraId: number;
    TipoObraId: number;
    Sinopse: string;
    EhObraMaiorIdade: boolean;
    ListaGeneros: string[];
}

const handleSubmit = (valores: Values) => {        
    const formData = new FormData();    
    formData.append("ImagemCapa", valores.ImagemCapa)
    formData.append("Titulo", valores.Titulo)
    formData.append("TituloAlternativo", valores.TituloAlternativo)
    formData.append("AutorObra", valores.AutorObra)
    formData.append("Artista", valores.Artista)
    formData.append("Ano", valores.Ano)
    formData.append("UsuarioCadastro", valores.UsuarioCadastro)
    formData.append("StatusObraId", String(valores.StatusObraId))
    formData.append("TipoObraId", String(valores.TipoObraId))
    formData.append("Sinopse", valores.Sinopse)
    formData.append("EhObraMaiorIdade", String(valores.EhObraMaiorIdade))
    formData.append("ListaGeneros", String(valores.ListaGeneros))

    API.post("obra", formData, { headers: {'Content-Type': 'multipart/form-data'}})   
    .then((response) => { 
        if(response.status === 200){
            alert('Obra adicionada com sucesso!')
            window.location.href = ROTAS.OBRAS;
        }
    })
    .catch((error:any) => {
        console.log(error);
    });
};

const NovaObra: React.FC = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
    
    const initialValues: Values = {
        ImagemCapa: null,
        Titulo: "",
        TituloAlternativo: "",
        AutorObra: "",
        Artista: "",
        Ano: "",
        UsuarioCadastro: "Bravo",
        StatusObraId: data.listaStatusObra[0].id,
        TipoObraId: data.listaTipoObra[0].id,
        Sinopse: "",
        EhObraMaiorIdade: false,
        ListaGeneros: [],
    };
   
    const valorInicialImagem = new Blob();

    const [valorConteudoEditor, setValorConteudoEditor] = useState(
        initialValues.Sinopse
    );
    const [imagemCapa, setImagemCapa] = useState(valorInicialImagem);
    const [enderecoImagemCapa] = useState(capaPrincipal);

    const handleImagemCapa = (event: any) => {
        setImagemCapa(event.target.files[0]);
    };

    return (
        <LayoutDashBoard>
            <Container>
                <SecaoHeadBar>
                    <NavPaginas ajuste={true}>
                        <AddBoxIcon />
                        <h3>Nova Obra</h3>
                    </NavPaginas>
                </SecaoHeadBar>
                <ContainerForm>
                    <SecaoInputs>
                        <Formik initialValues={initialValues} onSubmit={handleSubmit} >
                            {({ values, setFieldValue }) => (
                                <Form>
                                    <label htmlFor="ImagemCapa"> Capa Principal:{" "} </label>                                    
                                    <InputFiles 
                                        classNameInput="inputIncluiCapaPrincipal" 
                                        idInput="ImagemCapa" 
                                        nameInput="ImagemCapa" 
                                        multipleInput={false}
                                        onChangeInput={(e: any) => { setFieldValue( "ImagemCapa", e.target.files[0] ); handleImagemCapa(e); }}
                                        typeInput={"file"}
                                        textoBotao="Selecione a imagem para capa da obra"  
                                    />

                                    <label htmlFor="Titulo" className="inputTitulo"> Título da Obra:{" "} </label> 
                                    <Field className="InputCampoDados" id="Titulo" name="Titulo" type="text" />

                                    <label htmlFor="TituloAlternativo"> Títulos alternativos: </label> 
                                    <Field className="InputCampoDados" id="TituloAlternativo" name="TituloAlternativo" type="text" />

                                    <label htmlFor="AutorObra"> Autor(es):{" "} 
                                    </label> <Field className="InputCampoDados" id="AutorObra" name="AutorObra" type="text" />

                                    <label htmlFor="Artista"> Artista(s):{" "} 
                                    </label> <Field className="InputCampoDados" id="Artista" name="Artista" type="text" />

                                    <label htmlFor="Ano"> Ano de publicação:{" "} 
                                    </label> <Field className="InputCampoDados" id="Ano" name="Ano" type="text" />

                                    <label htmlFor="ListaGeneros">Gêneros: </label>
                                    <SecaoGeneros>
                                        {data.listaGeneros.map((generoObra: any) => {
                                            return (
                                                <label key={generoObra.id}>
                                                    <Field className="checkBoxGeneros" type="checkbox" name="ListaGeneros" value={ generoObra.descricao } />
                                                        {generoObra.descricao}
                                                </label> 
                                                ); 
                                            } 
                                        )}
                                    </SecaoGeneros>

                                    <label htmlFor="Sinopse">Sinopse:</label>
                                    <EditorTsun larguraEditor="115%" tamanhoEditor="400px" valorConteudoEditor={ valorConteudoEditor } setValorConteudoEditor={ setValorConteudoEditor } />

                                    <SecaoOutrasInformacoes>
                                        <label>
                                            <Field className="checkBoxOutrasInformacoes" type="checkbox" name="EhObraMaiorIdade" /> +18
                                        </label>

                                    <Field name="TipoObraId" id="TipoObraId">
                                        {({ field }: FieldProps) => {
                                            const options = data.listaTipoObra.map((tipoObra: any) => {return (<option key={tipoObra.id} value={tipoObra.id}>{tipoObra.descricao}</option>); });                                            
                                        return ( 
                                            <div> 
                                                <select className="selectTipoObras" {...field}> {options} </select>
                                            </div>
                                            );
                                        }}
                                    </Field>
                                    
                                    <Field name="StatusObraId" id="StatusObraId" >
                                        {({ field }: FieldProps) => 
                                            { const options = data.listaStatusObra.map((statusObra: any) => {return (<option key={statusObra.id} value={statusObra.id}>{statusObra.descricao}</option>); });
                                            return ( 
                                                <div>
                                                    <select className="selectTipoObras" {...field}> {options} </select>
                                                </div>
                                            );
                                        }}
                                    </Field>                                    
                                    </SecaoOutrasInformacoes>
                                    <SecaoBotoesSubmit>
                                        <button className="botao-submit sucesso" type="submit" > Adicionar </button>
                                    </SecaoBotoesSubmit>

                                    <Field className="InputCampoDados inputText hidden" id="Sinopse" name="Sinopse" as="textarea" value={ (values.Sinopse = valorConteudoEditor) } />
                                </Form>
                            )}
                        </Formik>
                    </SecaoInputs>
                    <SecaoCapaObra>
                        {imagemCapa.size > 0 ? ( <ImagemCapaObraPrincipal src={URL.createObjectURL(imagemCapa)} alt="Capa Principal" />) 
                                             : ( <ImagemCapaObraPrincipal src={enderecoImagemCapa} alt="Capa Principal" /> )}
                    </SecaoCapaObra>
                </ContainerForm>
            </Container>
        </LayoutDashBoard>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const { data } = await API.get(`obra/informacoes-obra`, { httpsAgent });    
    return { props: { data } };
};

export default NovaObra;

import React, { useState } from "react";
import Link from 'next/link';
import { Formik, Form, Field, FieldProps } from "formik";
import LayoutDashBoard from 'components/LayoutDashBoard';
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import EditorTsun from 'components/EditorTsun';
import EditorMangaTsun from 'components/EditorMangaTsun';
import Container, { ContainerForm, SecaoInputs, SecaoBotoesSubmit } from "../styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import https from "https";
import API from "services/API";
import * as ROTAS from "constants/rotas";

interface Values {
    Numero: number;
    Parte: number | any;
    ConteudoNovel: string;
    VolumeId: string;
    TituloObra: string;
    TituloCapitulo: string;
    TipoObraId: string;
    ListaImagensCapituloManga: Array<File> | any;
    UsuarioCadastro: string;
    ObraId: string;
}

const NovoCapitulo: React.FC = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const handleSubmit = (valores: Values) => {     

        const formData = new FormData();        

        if(valores.ListaImagensCapituloManga[0] !== undefined){
            for (var i = 0; i < valores.ListaImagensCapituloManga[0].length; i++) {
                formData.append("ListaImagensCapituloManga", valores.ListaImagensCapituloManga[0][i]);
            }
        }
        
        formData.append("Numero", String(valores.Numero))
        formData.append("Parte", valores.Parte)
        formData.append("Titulo", valores.TituloCapitulo)
        formData.append("VolumeId", valores.VolumeId)
        formData.append("ConteudoNovel", valores.ConteudoNovel)
        formData.append("UsuarioCadastro", valores.UsuarioCadastro)    

        API.post("capitulo", formData, { headers: {'Content-Type': 'multipart/form-data'}})
        .then((response:any) => { 
            if(response.status === 200){
                window.location.href = ROTAS.INDICEOBRAS + `/${valores.ObraId}`;
            }
        })
        .catch((error:any) => {
            console.log(error);
        });
    };     
    
    const initialValues: Values = {
        Numero: 0,
        Parte: "",
        ConteudoNovel: "",
        VolumeId: "",   
        TituloObra: "",
        TituloCapitulo: "",
        TipoObraId: "",
        ListaImagensCapituloManga: null,
        UsuarioCadastro: "Bravo",
        ObraId: data.obra.id,
    };
  
  const [valorConteudoEditor, setValorConteudoEditor] = useState("");
  const [valorconteudoImagensCapitulo, setValorconteudoImagensCapitulo] = useState<any[]>([]);
  
    const listaVolumes = [{"id":"0","numero": "Selecione o volume "}]
    for (let volume of data.obra.volumes) {
        let dataVolume = {"id": volume.id, "numero": volume.numero}
        listaVolumes.push(dataVolume);
    }

  return (
    <LayoutDashBoard>
      <Container>
        <SecaoHeadBar>
          <NavPaginas>
            <AddBoxIcon />
            <h3>Novo Capítulo</h3>
          </NavPaginas>
        </SecaoHeadBar>
        <ContainerForm>
          <SecaoInputs>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values }) => (
              <Form>
                <h4>{data.obra.titulo} Obra aqui</h4>
                <br></br>
                <br></br>
                <div>
                  <label htmlFor="VolumeId">Volume: </label>
                  <div>                   
                    <Field name="VolumeId" id="VolumeId">
                        {({ field }: FieldProps) => {
                            const options = listaVolumes.map((volume: any) => {return (<option key={volume.id} value={volume?.id}>{volume?.numero}</option>); });
                            return ( 
                                <div> 
                                    <select className="selectTipoObras" {...field}> {options} </select>
                                </div>
                            );
                        }}
                    </Field>
                  </div>
                </div>                

                <label htmlFor="Numero">Número do capítulo: </label>
                <Field className="InputCampoDados larguraInputsAuxiiar" id="Numero" name="Numero" type="number" />

                <label htmlFor="Parte">Parte capítulo: </label>
                <Field className="InputCampoDados larguraInputsAuxiiar" id="Parte" name="Parte" type="number" />

                <label htmlFor="TituloCapitulo">Título do capítulo: </label>
                <Field className="InputCampoDados" id="TituloCapitulo" name="TituloCapitulo" type="text" />

                <label htmlFor="conteudo">Conteudo: </label>

                {data?.ehComic               
                ? <EditorMangaTsun valorconteudoImagensCapitulo={valorconteudoImagensCapitulo}  setValorconteudoImagensCapitulo={setValorconteudoImagensCapitulo} />
                : <EditorTsun larguraEditor='90%' tamanhoEditor='1250px' valorConteudoEditor={valorConteudoEditor} setValorConteudoEditor={setValorConteudoEditor} />}
                 
                <SecaoBotoesSubmit>
                    <button className="botao-submit sucesso" type="submit">
                        Adicionar
                    </button>

                    <button className="botao-submit secundaria">
                    <Link href={ROTAS.INDICEOBRAS + `/${values.ObraId}`}>
                        <a>Voltar</a>
                    </Link>
                    </button>

                </SecaoBotoesSubmit>

                <input  className="inputIncluiCapaPrincipal hidden" id="ListaImagensCapituloManga" name="ListaImagensCapituloManga" type="hidden" value={values.ListaImagensCapituloManga = valorconteudoImagensCapitulo} />
                <Field className="InputCampoDados inputText hidden" id="conteudo" name="conteudo" as="textarea" value={values.ConteudoNovel = valorConteudoEditor} />                
              </Form>
              )}
            </Formik>
          </SecaoInputs>
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
    const { data } = await API.get(`capitulo/dadosobra/${context.params?.id}`, { httpsAgent });
    return { props: { data } };
}


export default NovoCapitulo;

import React, { useState } from "react";
import Link from 'next/link';
import { Formik, Form, Field } from "formik";
import Blob from 'cross-blob';
import LayoutDashBoard from 'components/LayoutDashBoard';
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import EditorTsun from 'components/EditorTsun';
import EditorMangaTsun from 'components/EditorMangaTsun';
import Container, { ContainerForm, SecaoInputs, SecaoBotoesSubmit } from "../styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import * as ROTAS from "constants/rotas";

interface Values {
    Numero: string;
    Parte: string;
    ConteudoNovel: string;
  idObra: string;
  descricaoObra: string;
  volumeObra: string;
  nomeCapitulo: string;
  tipoObra: string;
  conteudoImagensCapitulo: Array<File> | any;
}

const handleSubmit = (valores: Values) => {
  alert(JSON.stringify(valores));
  console.log(valores);
};


const NovoCapitulo: React.FC = () => {
  const initialValues: Values = {
      Numero: "",
      Parte: "",
      ConteudoNovel: "",
    idObra: "",
    descricaoObra: "",
    volumeObra: "",
    nomeCapitulo: "",
    tipoObra: "Manga",
    conteudoImagensCapitulo: null,
  };
  
  const [valorConteudoEditor, setValorConteudoEditor] = useState("");
  const [valorconteudoImagensCapitulo, setValorconteudoImagensCapitulo] = useState<any[]>([]);
  
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
                <h4>Obra</h4>
                <br></br>
                <br></br>
                <div>
                  <label htmlFor="volumeObra">Volume: </label>
                  <div>

                <Field
                    component="select" id="volumeObra" name= "volumeObra" className="larguraInputsAuxiiar selectTipoObras">
                    <option value="0" selected={true}>
                      Selecione o volume
                    </option>
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                  </Field>

                  </div>
                </div>                

                <label htmlFor="numeroCapitulo">Número do capítulo: </label>
                <Field className="InputCampoDados larguraInputsAuxiiar" id="numeroCapitulo" name="numeroCapitulo" type="number" />

                <label htmlFor="parteCapitulo">Parte capítulo: </label>
                <Field className="InputCampoDados larguraInputsAuxiiar" id="parteCapitulo" name="parteCapitulo" type="text" />

                <label htmlFor="nomeCapitulo">Título do capítulo: </label>
                <Field className="InputCampoDados" id="nomeCapitulo" name="nomeCapitulo" type="text" />                

                <label htmlFor="slugCapitulo">Slug capítulo: </label>
                <Field className="InputCampoDados" id="slugCapitulo"  name="slugCapitulo" type="text" disabled={true} />

                <label htmlFor="conteudo">Conteudo: </label>                
                
                {(values.tipoObra === "Light Novel" || values.tipoObra === "Web Novel") === false                
                ? <EditorMangaTsun valorconteudoImagensCapitulo={valorconteudoImagensCapitulo}  setValorconteudoImagensCapitulo={setValorconteudoImagensCapitulo} />
                : <EditorTsun larguraEditor='90%' tamanhoEditor='1250px' valorConteudoEditor={valorConteudoEditor} setValorConteudoEditor={setValorConteudoEditor} />}
                 
                <SecaoBotoesSubmit>
                    <button className="botao-submit sucesso" type="submit">
                        Adicionar
                    </button>

                    <button className="botao-submit secundaria">
                    <Link href={ROTAS.INDICEOBRAS + "/1"}>
                        <a>Voltar</a>
                    </Link>
                    </button>

                </SecaoBotoesSubmit>

                <input  className="inputIncluiCapaPrincipal hidden" id="ArrayImagensCapitulo" name="ArrayImagensCapitulo" type="hidden" value={values.conteudoImagensCapitulo = valorconteudoImagensCapitulo} />
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

export default NovoCapitulo;

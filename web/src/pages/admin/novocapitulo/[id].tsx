import React, { useState } from "react";
import Link from 'next/link';
import { Formik, Form, Field } from "formik";
import Blob from 'cross-blob';
import LayoutDashBoard from 'components/LayoutDashBoard';
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import EditorTsun from 'components/EditorTsun';
import Container, { ContainerForm, SecaoInputs, SecaoBotoesSubmit } from "./styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import * as ROTAS from "constants/rotas";

interface Values {
  idObra: string;
  descricaoObra: string;
  volumeObra: string;
  numeroCapitulo: string;
  nomeCapitulo: string;
  conteudo: string | Blob;
  tipoObra: string;
  slugCapitulo: string;
  parteCapitulo: string;
}

const handleSubmit = (valores: Values) => {
  alert(JSON.stringify(valores));
  console.log(JSON.stringify(valores));
};

let ehNovel = false;

const NovoCapitulo: React.FC = () => {
  const initialValues: Values = {
    idObra: "",
    descricaoObra: "",
    volumeObra: "",
    numeroCapitulo: "",
    nomeCapitulo: "",
    conteudo: "",
    tipoObra: "Manga",
    slugCapitulo: "",
    parteCapitulo: "",
  };

  const [valorConteudoEditor, setValorConteudoEditor] = useState("");  

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

                {ehNovel = values.tipoObra === "Light Novel" || values.tipoObra === "Web Novel"}

                
                <label htmlFor="descricaoObra">É novel?: {ehNovel} </label>
                

                <label htmlFor="descricaoObra">Obra: </label>
                <Field className="InputCampoDados" id="descricaoObra" name="descricaoObra" type="text" />

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

                <label htmlFor="nomeCapitulo">Nome do capítulo: </label>
                <Field className="InputCampoDados" id="nomeCapitulo" name="nomeCapitulo" type="text" /> 

                <label htmlFor="ordemCapitulo">Ordem do capítulo: </label>
                <Field className="InputCampoDados larguraInputsAuxiiar" id="ordemCapitulo" name="ordemCapitulo" type="number" />

                <label htmlFor="slugCapitulo">Slug capítulo: </label>
                <Field className="InputCampoDados" id="slugCapitulo"  name="slugCapitulo" type="text" />

                <label htmlFor="conteudo">Conteudo: </label>
                {/* <EditorTsun larguraEditor='90%' tamanhoEditor='1250px' valorConteudoEditor={valorConteudoEditor} setValorConteudoEditor={setValorConteudoEditor} /> */}

                {values.tipoObra === "Light Novel"                
                ? (<div>"Mango aqui"</div>) 
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
                
                <Field className="InputCampoDados inputText hidden" id="conteudo" name="conteudo" as="textarea" value={values.conteudo = valorConteudoEditor} />                
              </Form>
              )}
            </Formik>
          </SecaoInputs>
        </ContainerForm>
      </Container>
    </LayoutDashBoard>
  );
};

console.log(ehNovel)

export default NovoCapitulo;

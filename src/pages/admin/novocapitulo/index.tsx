import React from "react";
import LayoutDashBoard from "components/LayoutDashBoard";
import { Formik, Form, Field } from "formik";
import Container, {
  ContainerForm,
  SecaoInputs,
  SecaoBotoesSubmit
} from "./styles";
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import AddBoxIcon from "@material-ui/icons/AddBox";

interface Values {
  idObra: string;
  volumeObra: string;
  numeroCapitulo: string;
  nomeCapitulo: string;
  conteudo: string;
  tipoObra: string;
}

const handleSubmit = (valores: Values) => {
    alert(JSON.stringify(valores));
    console.log(JSON.stringify(valores));
}

const NovoCapitulo: React.FC = () => {
  
    const initialValues: Values = {
    idObra: "",
    volumeObra: "",
    numeroCapitulo: "",
    nomeCapitulo: "",
    conteudo: "",
    tipoObra: "",
  };

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
              <Form >
               
                <label htmlFor="volumeObra">Volume: </label>
                <Field component="select" id="volumeObra" name="volumeObra" className="selectTipoObras larguraInputsAuxiiar">
                    <option value="0" selected={true}>Selecione o volume</option>
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                </Field>

                <label htmlFor="numeroCapitulo">Número do capítulo: </label>
                <Field className="InputCampoDados larguraInputsAuxiiar" id="numeroCapitulo" name="numeroCapitulo" type="number" />

                <label htmlFor="nomeCapitulo">Nome do capítulo: </label>
                <Field className="InputCampoDados" id="nomeCapitulo" name="nomeCapitulo" type="text" />
                
                <label htmlFor="ordemCapitulo">Ordem do capítulo: </label>
                <Field className="InputCampoDados larguraInputsAuxiiar" id="ordemCapitulo" name="ordemCapitulo" type="number" />
                
                <label htmlFor="conteudo">Conteudo: </label>
                <Field className="InputCampoDados inputText" id="conteudo" name="conteudo" as="textarea" />

                
                <SecaoBotoesSubmit>
                    <button className="botao-submit sucesso" type="submit">Adicionar</button>
                </SecaoBotoesSubmit>

              </Form>
            </Formik>
          </SecaoInputs>        
        </ContainerForm>
      </Container>
    </LayoutDashBoard>
  );
};

export default NovoCapitulo;

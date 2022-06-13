import React, { useState } from "react";
import LayoutDashBoard from "../../../components/LayoutDashBoard";
import { Formik, Form, Field } from "formik";
import Container, {
  ContainerForm,
  SecaoInputs,
  InputIncluiCapaPrincipal,
  SecaoOutrasInformacoes,
  SecaoGeneros,
  SecaoBotoesSubmit,
} from "./styles";
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditorTsun from "../../../components/EditorTsun/index";

interface Values {
  capaPrincipalObra: string;
  tituloObra: string;
  titulosAlternativos: string;
  autor: string;
  artista: string;
  generos: string[];
  sinopse: any;
  maiorIdade: string;
}

const handleSubmit = (valores: Values) => {
  alert(JSON.stringify(valores));
  console.log(JSON.stringify(valores));
};

const NovaObra: React.FC = () => {
  const [valorSinopse, setValorSinopse] = useState("<p>Teste</p>");


  const initialValues: Values = {
    capaPrincipalObra: "",
    tituloObra: "Teste",
    titulosAlternativos: "",
    autor: "",
    artista: "",
    generos: [""],
    sinopse: "",
    maiorIdade: "não",
  };

  return (
    <LayoutDashBoard>
      <Container>
        <SecaoHeadBar>
          <NavPaginas>
            <AddBoxIcon />
            <h3>Nova Obra</h3>
          </NavPaginas>
        </SecaoHeadBar>
        <ContainerForm>
          <SecaoInputs>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values }) => (
              <Form>
                <label htmlFor="capaPrincipalObra">Capa Principal: </label>
                <InputIncluiCapaPrincipal
                  id="capaPrincipalObra"
                  name="capaPrincipalObra"
                />

                <label htmlFor="tituloObra">Título da Obra: </label>
                <Field
                  className="InputCampoDados"
                  id="tituloObra"
                  name="tituloObra"
                  type="text"
                />

                <label htmlFor="titulosAlternativos">
                  Títulos alternativos:{" "}
                </label>
                <Field
                  className="InputCampoDados"
                  id="titulosAlternativos"
                  name="titulosAlternativos"
                  type="text"
                />

                <label htmlFor="autor">Autor: </label>
                <Field
                  className="InputCampoDados"
                  id="autor"
                  name="autor"
                  type="text"
                />

                <label htmlFor="artista">Artista: </label>
                <Field
                  className="InputCampoDados"
                  id="artista"
                  name="artista"
                  type="text"
                />

                <label htmlFor="generos">Gêneros: </label>
                <SecaoGeneros>
                  <label>
                    <Field
                      className="checkBoxGeneros"
                      type="checkbox"
                      name="generos"
                      value="Aventura"
                    />
                    Aventura
                  </label>
                  <label>
                    <Field
                      className="checkBoxGeneros"
                      type="checkbox"
                      name="generos"
                      value="Ação"
                    />
                    Ação
                  </label>
                  <label>
                    <Field
                      className="checkBoxGeneros"
                      type="checkbox"
                      name="generos"
                      value="Fantasia"
                    />
                    Fantasia
                  </label>
                  <label>
                    <Field
                      className="checkBoxGeneros"
                      type="checkbox"
                      name="generos"
                      value="Comédia"
                    />
                    Comédia
                  </label>
                  <label>
                    <Field
                      className="checkBoxGeneros"
                      type="checkbox"
                      name="generos"
                      value="Drama"
                    />
                    Drama
                  </label>
                  <label>
                    <Field
                      className="checkBoxGeneros"
                      type="checkbox"
                      name="generos"
                      value="Slice  of Life"
                    />
                    Slice of Life
                  </label>
                </SecaoGeneros>

                <label htmlFor="sinopse">Sinopse: 
                    {/* <Field
                    className="InputCampoDados"
                    id="sinopse"
                    name="sinopse"
                    placeholder="sinopse"
                    type="text"
                    value={valorSinopse}
                    /> */}
                </label>

                <Field className="InputCampoDados inputText hidden" id="sinopse" name="sinopse" as="textarea" value={values.sinopse = valorSinopse} />
                <EditorTsun name="teste" setValorSinopse={setValorSinopse} />

                

                <SecaoOutrasInformacoes>
                  <label>
                    <Field
                      className="checkBoxOutrasInformacoes"
                      type="checkbox"
                      name="maiorIdade"
                      value="sim"
                    />
                    +18
                  </label>

                  <Field
                    component="select"
                    id="tipoObra"
                    name="tipoObra"
                    className="selectTipoObras"
                  >
                    <option value="0" selected={true}>
                      Selecione o tipo da obra
                    </option>
                    <option value="1">Light Novel</option>
                    <option value="2">Web Novel</option>
                    <option value="3">Mangá</option>
                    <option value="4">Manhua</option>
                    <option value="5">Manhwa</option>
                  </Field>

                  <Field
                    component="select"
                    id="statusObra"
                    name="statusObra"
                    className="selectTipoObras"
                  >
                    <option value="0" selected={true}>
                      Selecione o status da obra
                    </option>
                    <option value="1">Em Andamento</option>
                    <option value="2">Completa</option>
                    <option value="3">Pausada</option>
                    <option value="4">Dropada</option>
                  </Field>
                </SecaoOutrasInformacoes>

                <SecaoBotoesSubmit>
                  <button className="botao-submit sucesso" type="submit">
                    Adicionar
                  </button>
                </SecaoBotoesSubmit>
              </Form>
              )}
            </Formik>
          </SecaoInputs>
        </ContainerForm>
      </Container>
    </LayoutDashBoard>
  );
};

export default NovaObra;

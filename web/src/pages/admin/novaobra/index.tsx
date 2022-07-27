import React, { useState } from "react";
import LayoutDashBoard from 'components/LayoutDashBoard';
import { Formik, Form, Field } from "formik";
import Container, { ContainerForm, SecaoInputs, SecaoOutrasInformacoes, SecaoGeneros, SecaoBotoesSubmit, SecaoCapaObra } from "./styles";
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditorTsun from "components/EditorTsun/index";
import { ImagemCapaObraPrincipal } from '../novocapitulo/styles';
import Blob from 'cross-blob';

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

import capaPrincipal from '../../../../public/assets/img/logoTemaDark.svg';

const NovaObra: React.FC = () => {
  
  const initialValues: Values = {
    capaPrincipalObra: "",
    tituloObra: "",
    titulosAlternativos: "",
    autor: "",
    artista: "",
    generos: [""],
    sinopse: "",
    maiorIdade: "não",
  };

  const valorInicialImagem = new Blob();

  const [valorConteudoEditor, setValorConteudoEditor] = useState('');
  const [imagemCapa, setImagemCapa] = useState(valorInicialImagem);
  const [enderecoImagemCapa] = useState(capaPrincipal);  

    const handleImagemCapa = (event: any) => {
        setImagemCapa(event.target.files[0])
    }

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
                <Field className="inputIncluiCapaPrincipal" id="capaPrincipalObra" name="capaPrincipalObra" type="file" onChange={handleImagemCapa}/>

                <label htmlFor="tituloObra">Título da Obra: </label>
                <Field
                  className="InputCampoDados"
                  id="tituloObra"
                  name="tituloObra"
                  type="text"
                />

                <label htmlFor="titulosAlternativos">
                  Títulos alternativos:
                </label>
                <Field
                  className="InputCampoDados"
                  id="titulosAlternativos"
                  name="titulosAlternativos"
                  type="text"
                />

                <label htmlFor="autor">Autor(es): </label>
                <Field
                  className="InputCampoDados"
                  id="autor"
                  name="autor"
                  type="text"
                />

                <label htmlFor="artista">Artista(s): </label>
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

                <label htmlFor="sinopse">Sinopse:</label>                
                <EditorTsun larguraEditor='100%' tamanhoEditor='500px' valorConteudoEditor={valorConteudoEditor} setValorConteudoEditor={setValorConteudoEditor} />

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

                <Field className="InputCampoDados inputText hidden" id="sinopse" name="sinopse" as="textarea" value={values.sinopse = valorConteudoEditor} />

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

export default NovaObra;

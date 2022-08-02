import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import Blob from 'cross-blob';
import LayoutDashBoard from 'components/LayoutDashBoard';
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import EditorTsun from "components/EditorTsun/index";
import Container, {ContainerForm, SecaoInputs, SecaoCapaObra, ImagemCapaObraPrincipal, SecaoOutrasInformacoes, SecaoGeneros, SecaoBotoesSubmit, } from "./styles";
import AddBoxIcon from "@material-ui/icons/AddBox";

interface Values {
  capaPrincipalObra: File | any;
  tituloObra: string;
  titulosAlternativos: string;
  autor: string;
  artista: string;
  generos: string[];
  sinopse: string;
  maiorIdade: boolean;
  tipoObra: string;
  statusObra: string;
}

const handleSubmit = (valores: Values) => {
  alert(valores);
  console.log(valores);
};

import capaPrincipal from '../../../../public/assets/img/logoTemaLight.svg';

const listaTipoObra = ["Selecione o tipo da obra", "Light Novel","Web Novel","Mangá","Manhua","Manhwa"];
const listaStatusObra = ["Selecione o status da obra", "Em Andamento","Completa","Pausada","Dropada"];
const listaGeneros = ["Slice  of Life", "Drama", "Comédia", "Fantasia", "Ação", "Aventura"] // Virá do banco de dados

const NovaObra: React.FC = () => {
  
  const initialValues: Values = {
    capaPrincipalObra: null,
    tituloObra: "",
    titulosAlternativos: "",
    autor: "",
    artista: "",
    generos: [""],
    sinopse: "",
    maiorIdade: false,
    tipoObra: "Selecione o tipo da obra",
    statusObra: "Selecione o status da obra"
  };

  const valorInicialImagem = new Blob();

  const [valorConteudoEditor, setValorConteudoEditor] = useState(initialValues.sinopse);
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
            {({ values, setFieldValue }) => (
              <Form>
                <label htmlFor="capaPrincipalObra">Capa Principal: </label>                
                <input className="inputIncluiCapaPrincipal" id="capaPrincipalObra" name="capaPrincipalObra" type="file" onChange={(e:any) => { setFieldValue("capaPrincipalObra", e.target.files[0]); handleImagemCapa(e) }} />

                <label htmlFor="tituloObra">Título da Obra: </label>
                <Field className="InputCampoDados" id="tituloObra" name="tituloObra" type="text" />

                <label htmlFor="titulosAlternativos">
                  Títulos alternativos:
                </label>
                <Field className="InputCampoDados" id="titulosAlternativos" name="titulosAlternativos" type="text" />

                <label htmlFor="autor">Autor(es): </label>
                <Field className="InputCampoDados" id="autor" name="autor" type="text" />

                <label htmlFor="artista">Artista(s): </label>
                <Field className="InputCampoDados" id="artista" name="artista" type="text" />

                <label htmlFor="generos">Gêneros: </label>
                <SecaoGeneros>
                    {listaGeneros.map((opt) =>{
                        return (
                            <label key={opt}>
                                <Field className="checkBoxGeneros" type="checkbox" name="generos" value={opt} />
                                {opt}
                            </label>
                        )
                    })}
                </SecaoGeneros>              

                <label htmlFor="sinopse">Sinopse:</label>                
                <EditorTsun larguraEditor='100%' tamanhoEditor='200px' valorConteudoEditor={valorConteudoEditor} setValorConteudoEditor={setValorConteudoEditor} />

                <SecaoOutrasInformacoes>
                  <label>
                    <Field className="checkBoxOutrasInformacoes" type="checkbox" name="maiorIdade" />
                    +18
                  </label>

                  <Field name="tipoObra" id="tipoObra">
                    {({ field }: FieldProps) => {
                     const options=listaTipoObra.map((opt)=>{return (<option key={opt} value={opt}>{opt}</option>)})
                    return (
                        <div>
                            <select className="selectTipoObras" {...field}>{options}</select>
                        </div>
                        )
                    }}
                  </Field>

                  <Field name="statusObra" id="statusObra">
                      {({ field }: FieldProps) => {
                      const options=listaStatusObra.map((opt)=>{return (<option key={opt} value={opt}>{opt}</option>)})
                      return (
                          <div>
                              <select className="selectTipoObras" {...field}>{options}</select>
                          </div>
                          )
                      }}
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

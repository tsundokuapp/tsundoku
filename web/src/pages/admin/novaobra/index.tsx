import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import Blob from 'cross-blob';
import LayoutDashBoard from 'components/LayoutDashBoard';
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import EditorTsun from "components/EditorTsun/index";
import Container, { ContainerForm, SecaoInputs, SecaoOutrasInformacoes, SecaoGeneros, SecaoBotoesSubmit, SecaoCapaObra } from "./styles";
import { ImagemCapaObraPrincipal } from '../novocapitulo/styles';
import AddBoxIcon from "@material-ui/icons/AddBox";

interface Values {
  capaPrincipalObra: string;
  tituloObra: string;
  titulosAlternativos: string;
  autor: string;
  artista: string;
  generos: string[];
  sinopse: any;
  maiorIdade: string;
  tipoObra: string;
}

const handleSubmit = (valores: Values) => {
  alert(JSON.stringify(valores));
  console.log(JSON.stringify(valores));
};

import capaPrincipal from '../../../../public/assets/img/logoTemaDark.svg';

const listaTipoObra = ["Selecione o tipo da obra", "Light Novel","Web Novel","Mangá","Manhua","Manhwa"];
const listaStatusObra = ["Selecione o status da obra", "Em Andamento","Completa","Pausada","Dropada"];
const listaGeneros = ["Slice  of Life", "Drama", "Comédia", "Fantasia", "Ação", "Aventura"] // Virá do banco de dados

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
    tipoObra: "Selecione o tipo da obra"
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
                <EditorTsun larguraEditor='100%' tamanhoEditor='500px' valorConteudoEditor={valorConteudoEditor} setValorConteudoEditor={setValorConteudoEditor} />

                <SecaoOutrasInformacoes>
                  <label>
                    <Field className="checkBoxOutrasInformacoes" type="checkbox" name="maiorIdade" value="sim" />
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

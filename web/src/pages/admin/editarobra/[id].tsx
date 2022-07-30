import React, { useState } from "react";
import LayoutDashBoard from 'components/LayoutDashBoard';
import { Formik, Form, Field } from "formik";
import Container, {
  ContainerForm,
  SecaoInputs,
  SecaoCapaObra,
  InputIncluiCapaPrincipal,
  ImagemCapaObraPrincipal,
  SecaoOutrasInformacoes,
  SecaoGeneros,
  SecaoBotoesSubmit,
} from "../novaobra/styles";
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import EditIcon from '@material-ui/icons/Edit';

import EditorTsun from "components/EditorTsun/index";

import capaPrincipal from '../../../../public/assets/img/backgroudscard/MushokuTensei.png';

interface Values {
  capaPrincipalObra: File | any;
  tituloObra: string;
  titulosAlternativos: string;
  autor: string;
  artista: string;
  categorias: string[];
  sinopse: string;
  maiorIdade: string;
}

const handleSubmit = (valores: Values) => {
    alert(JSON.stringify(valores));
    console.log(JSON.stringify(valores));
}

const excluirObra = () =>{
    alert("Obra Excluída");
}

const EditarObra: React.FC = () => {

  const initialValues: Values = {
    capaPrincipalObra: null,
    tituloObra: "Mushoku Tensei: Reencarnação do Desempregado",
    titulosAlternativos: "Mushoku Tensei: Isekai Ittara Honki Dasu | 無職転生 | 無職転生 – 異世界行ったら本気だす | Mushoku Tensei: Jobless Reincarnation ~ It will be All Out if I Go to Another World ~",
    autor: "Rifujin na Magonote",
    artista: "Shirotaka",
    categorias: ["Ação, Aventura"],
    sinopse:"<p>Aqui é um parágrafo, pode acreditar<p><p>Mais um aqui<p><p>Oxi, mais um?!<p>",
    maiorIdade: "não"
  };

  const [valorConteudoEditor, setValorConteudoEditor] = useState(initialValues.sinopse);
  
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
            {({ values }) => (
              <Form >
                
                <label htmlFor="capaPrincipalObra" >Capa Principal: </label>
                <InputIncluiCapaPrincipal id="capaPrincipalObra" name="capaPrincipalObra" />

                <label htmlFor="tituloObra">Título da Obra: </label>
                <Field className="InputCampoDados" id="tituloObra" name="tituloObra" type="text" />
                
                <label htmlFor="titulosAlternativos">Títulos alternativos: </label>
                <Field className="InputCampoDados" id="titulosAlternativos" name="titulosAlternativos" type="text" />
                
                <label htmlFor="autor">Autor(es): </label>
                <Field className="InputCampoDados" id="autor" name="autor" type="text" />
                
                <label htmlFor="artista">Artista(s): </label>
                <Field className="InputCampoDados" id="artista" name="artista" type="text" />
                
                <label htmlFor="generos">Gêneros: </label>
                <SecaoGeneros>
                    <label>
                            <Field className="checkBoxGeneros" type="checkbox" name="generos" checked={true} value="Aventura" />
                            Aventura
                    </label>
                    <label>
                            <Field className="checkBoxGeneros" type="checkbox" name="generos" checked={true} value="Ação" />
                            Ação
                    </label>
                    <label>
                            <Field className="checkBoxGeneros" type="checkbox" name="generos" value="Fantasia" />
                            Fantasia
                    </label>
                    <label>
                            <Field className="checkBoxGeneros" type="checkbox" name="generos" value="Comédia" />
                            Comédia
                    </label>
                    <label>
                            <Field className="checkBoxGeneros" type="checkbox" name="generos" value="Drama" />
                            Drama
                    </label>
                    <label>
                            <Field className="checkBoxGeneros" type="checkbox" name="generos" value="Slice  of Life" />
                            Slice  of Life
                    </label>
                </SecaoGeneros>
                
                <label htmlFor="sinopse">Sinopse:</label>                
                <EditorTsun larguraEditor='100%' tamanhoEditor='500px' valorConteudoEditor={valorConteudoEditor} setValorConteudoEditor={setValorConteudoEditor} />

                <SecaoOutrasInformacoes>
                    <label>
                        <Field className="checkBoxOutrasInformacoes" type="checkbox" name="maiorIdade" value="sim" />
                        +18
                    </label>

                    <Field component="select" id="tipoObra" name="tipoObra" className="selectTipoObras">
                            <option value="0">Selecione o tipo da obra</option>
                            <option value="1"selected={true}>Light Novel</option>
                            <option value="2">Web Novel</option>
                            <option value="3">Mangá</option>
                            <option value="4">Manhua</option>
                            <option value="5">Manhwa</option>
                    </Field>

                    <Field component="select" id="statusObra" name="statusObra" className="selectTipoObras">
                            <option value="0">Selecione o status da obra</option>
                            <option value="1" selected={true}>Em Andamento</option>
                            <option value="2">Completa</option>
                            <option value="3">Pausada</option>
                            <option value="4">Dropada</option>
                            <option value="5">Manhwa</option>
                    </Field>
                    
                </SecaoOutrasInformacoes>

                <SecaoBotoesSubmit>
                    <button className="botao-submit secundaria" type="submit">Alterar</button>                
                    <button className="botao-submit aviso" type="button" onClick={excluirObra}>Excluir</button>
                </SecaoBotoesSubmit>

                <Field className="InputCampoDados inputText hidden" id="sinopse" name="sinopse" as="textarea" value={values.sinopse = valorConteudoEditor} />

              </Form>
              )}
            </Formik>
          </SecaoInputs>
          <SecaoCapaObra>
            <ImagemCapaObraPrincipal src={capaPrincipal} />
          </SecaoCapaObra>
        </ContainerForm>
      </Container>
    </LayoutDashBoard>
  );
};

export default EditarObra;

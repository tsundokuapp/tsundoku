import React from "react";
import LayoutDashBoard from "components/LayoutDashBoard";
import { Formik, Form, Field } from "formik";
import Container, {
  ContainerForm,
  SecaoInputs,
  SecaoCapaObra,
  InputIncluiCapaPrincipal,
  ImagemCapaObraPrincipal,
  SecaoOutrasInformacoes,
  SecaoCategorias,
  SecaoBotoesSubmit,
} from "../novaobra/styles";
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import EditIcon from '@material-ui/icons/Edit';

import capaPrincipal from "assets/img/backgroudscard/MushokuTensei.png";

interface Values {
  capaPrincipalObra: string;
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
    capaPrincipalObra: "",
    tituloObra: "Mushoku Tensei: Reencarnação do Desempregado",
    titulosAlternativos: "Mushoku Tensei: Isekai Ittara Honki Dasu | 無職転生 | 無職転生 – 異世界行ったら本気だす | Mushoku Tensei: Jobless Reincarnation ~ It will be All Out if I Go to Another World ~",
    autor: "Rifujin na Magonote",
    artista: "Shirotaka",
    categorias: ["Ação, Aventura"],
    sinopse:"Alguma coisa aqui até eu achar um editor de texto",
    maiorIdade: "não"
  };

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
              <Form >
                
                <label htmlFor="capaPrincipalObra" >Capa Principal: </label>
                <InputIncluiCapaPrincipal id="capaPrincipalObra" name="capaPrincipalObra" />

                <label htmlFor="tituloObra">Título da Obra: </label>
                <Field className="InputCampoDados" id="tituloObra" name="tituloObra" type="text" />
                
                <label htmlFor="titulosAlternativos">Títulos alternativos: </label>
                <Field className="InputCampoDados" id="titulosAlternativos" name="titulosAlternativos" type="text" />
                
                <label htmlFor="autor">Autor: </label>
                <Field className="InputCampoDados" id="autor" name="autor" type="text" />
                
                <label htmlFor="artista">Artista: </label>
                <Field className="InputCampoDados" id="artista" name="artista" type="text" />
                
                <label htmlFor="categorias">Categorias: </label>
                <SecaoCategorias>
                    <label>
                            <Field className="checkBoxCategorias" type="checkbox" name="categorias" checked={true} value="Aventura" />
                            Aventura
                    </label>
                    <label>
                            <Field className="checkBoxCategorias" type="checkbox" name="categorias" checked={true} value="Ação" />
                            Ação
                    </label>
                    <label>
                            <Field className="checkBoxCategorias" type="checkbox" name="categorias" value="Fantasia" />
                            Fantasia
                    </label>
                    <label>
                            <Field className="checkBoxCategorias" type="checkbox" name="categorias" value="Comédia" />
                            Comédia
                    </label>
                    <label>
                            <Field className="checkBoxCategorias" type="checkbox" name="categorias" value="Drama" />
                            Drama
                    </label>
                    <label>
                            <Field className="checkBoxCategorias" type="checkbox" name="categorias" value="Slice  of Life" />
                            Slice  of Life
                    </label>
                </SecaoCategorias>
                
                <label htmlFor="sinopse">Sinopse: </label>
                <Field className="InputCampoDados inputText" id="sinopse" name="sinopse" as="textarea" />

                <SecaoOutrasInformacoes>
                    <label>
                        <Field className="checkBoxOutrasInformacoes" type="checkbox" name="maiorIdade" value="sim" />
                        +18
                    </label>

                    <Field
                            component="select"
                            id="tipoObra"
                            name="tipoObra"
                            className="selectTipoObras"
                        >
                            <option value="0">Selecione o tipo da obra</option>
                            <option value="1"selected={true}>Light Novel</option>
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

              </Form>
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

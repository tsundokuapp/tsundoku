import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import LayoutDashBoard from 'components/LayoutDashBoard';
import SecaoHeadBar from "components/SecaoHeadBar";
import NavPaginas from "components/NavPaginas";
import EditorTsun from "components/EditorTsun/index";
import Container, {ContainerForm, SecaoInputs, SecaoCapaObra, InputIncluiCapaPrincipal, ImagemCapaObraPrincipal, SecaoOutrasInformacoes, SecaoGeneros, SecaoBotoesSubmit, } from "../novaobra/styles";
import EditIcon from '@material-ui/icons/Edit';
import capaPrincipal from '../../../../public/assets/img/backgroudscard/MushokuTensei.png';

interface Values {
  capaPrincipalObra: File | any;
  tituloObra: string;
  titulosAlternativos: string;
  autor: string;
  artista: string;
  generos: string[];
  sinopse: string;
  maiorIdade: string;
  tipoObra: string;
}

const handleSubmit = (valores: Values) => {
    alert(JSON.stringify(valores));
    console.log(JSON.stringify(valores));
}

const excluirObra = () =>{
    alert("Obra Excluída");
}

const listaTipoObra = ["Selecione o tipo da obra", "Light Novel","Web Novel","Mangá","Manhua","Manhwa"];
const listaStatusObra = ["Selecione o status da obra", "Em Andamento","Completa","Pausada","Dropada"];
const listaGeneros = ["Slice  of Life", "Drama", "Comédia", "Fantasia", "Ação", "Aventura"] // Virá do banco de dados

const EditarObra: React.FC = () => {

  const initialValues: Values = {
    capaPrincipalObra: null,
    tituloObra: "Mushoku Tensei: Reencarnação do Desempregado",
    titulosAlternativos: "Mushoku Tensei: Isekai Ittara Honki Dasu | 無職転生 | 無職転生 – 異世界行ったら本気だす | Mushoku Tensei: Jobless Reincarnation ~ It will be All Out if I Go to Another World ~",
    autor: "Rifujin na Magonote",
    artista: "Shirotaka",
    generos: ["Ação", "Aventura"],
    sinopse:"<p>Aqui é um parágrafo, pode acreditar<p><p>Mais um aqui<p><p>Oxi, mais um?!<p>",
    maiorIdade: "não",    
    tipoObra: "Light Novel"
  };

  const [valorConteudoEditor, setValorConteudoEditor] = useState(initialValues.sinopse);
  
    const handleCheckState = (opcao: string) => {
        return initialValues.generos.some(element => element === opcao);
    }

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

                {listaGeneros.map((opt) =>{
                        return (
                            <label key={opt}>
                                <Field className="checkBoxGeneros" type="checkbox" name="generos" value={opt}  
                                checked={handleCheckState(opt)} 
                                />
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
